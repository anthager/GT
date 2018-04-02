import os
filePath = os.path.join(os.path.expanduser('~'), 'heja.py')
bash_profilePath = os.path.join(os.path.expanduser('~'), '.bash_profile')


f = open(filePath, 'w') 
f.write("if (True):\n \t print('hej')") 
 
f.close()