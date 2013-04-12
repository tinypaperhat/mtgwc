from subprocess import call
import os

src_path = '../src/'
files = [
    'card.js',
    'player.js',
    'game.js'
]

out = ''
for file in files:
    f = open(src_path + file, 'r')
    out += f.read()
    f.close()

if out[-1:] != '\n':
    out += '\n'
    
f = open('src.js', 'w')
f.write(out)
f.close()

call([
    'java', '-jar', 'compiler/compiler.jar', 
    '--js', 'src.js', '--js_output_file', src_path + 'src.js',
    '--compilation_level', 'ADVANCED_OPTIMIZATIONS'
    ])

os.remove('src.js')
