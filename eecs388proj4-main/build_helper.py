import os
import sys
import struct
import random
import hashlib
import subprocess

def target_command(target, stack_goal, output_file):
    flags = [
        '-m32',
        '-static',
        '-U_FORTIFY_SOURCE',
        '-Wno-implicit-function-declaration',
        '-fno-stack-protector',
        f'-DSTACK_GOAL={stack_goal}',
    ]

    if target == 0: flags.extend(['-z', 'execstack'])
    if target == 1: flags.extend(['-z', 'execstack'])
    if target == 2: flags.extend(['-z', 'execstack'])
    if target == 3: flags.extend(['-z', 'execstack'])
    if target == 4: flags.extend(['-z', 'execstack'])
    if target == 5: flags.extend([])
    if target == 6: flags.extend(['-z', 'execstack', '-DMINIASLR'])
    if target == 7: flags.extend(['-z', 'noexecstack'])

    return [
        'gcc',
        *flags,
        f'helper.c',
        f'target{target}.c',
        f'-o', f'{output_file}',
    ]

def prepare_generator(workdir):
    os.makedirs(workdir, exist_ok=True)

    pairs = []

    for target in range(0, 8):
        target_file = f'{workdir}/target{target}'
        offset_file = f'{target_file}-offset'

        if os.path.isfile(offset_file):
            #print(f'Using existing binary: {target_file}')

            with open(target_file, 'rb') as src:
                data = src.read()
            with open(offset_file, 'r') as src:
                offset = int(src.read())
        else:
            print(f'Generating binary: {target_file}')

            while True:
                stack_goal = random.randint(0, 0xFFFF_FFFF)
                stack_goal_value = struct.pack('=I', stack_goal)

                command = target_command(target, stack_goal, target_file)
                print(command)
                subprocess.run(command)
                with open(target_file, 'rb') as src:
                    data = src.read()

                offset = data.find(stack_goal_value)
                if offset != data.rfind(stack_goal_value):
                    continue

                data = bytearray(data)
                data[offset : offset + 4] = struct.pack('=I', 0)
                data = bytes(data)

                with open(target_file, 'wb') as out:
                    out.write(data)
                with open(offset_file, 'w') as out:
                    out.write(str(offset))
                break

        pairs.append((offset, data))

    return pairs

def generate(workdir, offsets, outputdir, stack_goal):
    assert len(offsets) == 8

    stack_goal_value = struct.pack('=I', stack_goal)

    os.makedirs(outputdir, exist_ok=True)

    for target in range(0, 8):
        (offset, data) = offsets[target]
        target_file = f'{workdir}/target{target}'
        output_file = f'{outputdir}/target{target}'

        modified = bytearray(data)
        modified[offset : offset + 4] = stack_goal_value

        with open(output_file, 'wb') as out:
            out.write(modified)

def get_cookie():
    print("Enter the uniqnames of all members of your team, separated by spaces. Each group’s targets will be slightly different, so make sure your uniqnames are correct!\n")
    print('Enter uniqnames separated by spaces: ', end='', flush=True)
    input_line = sys.stdin.readline().rstrip()
    uniqnames = sorted(list(set(input_line.lower().split())))
    print(f'Using cookie for {uniqnames}')

    raw = hashlib.sha256(('|'.join(uniqnames)).encode()).digest()
    cookie = int.from_bytes(raw, byteorder='little') % 0x7FFF

    with open('cookie', 'wb') as out:
        out.write(bytes(" ".join(uniqnames) + '\n', 'ascii'))
        out.write(bytes(str(cookie), 'ascii'))

    return cookie

if __name__ == '__main__':
    rootdir = os.path.dirname(os.path.realpath(__file__))
    workdir = os.path.join(rootdir, 'bin')
    offsets = prepare_generator(workdir)

    cookie = get_cookie()
    generate(workdir, offsets, rootdir, 0xffff_0000 - cookie)
