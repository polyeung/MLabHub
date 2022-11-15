import sys
output = "elijahqi"
output = output.encode()
output += "\0".encode()*2+"A+".encode()
#print(output)
sys.stdout.buffer.write(output)