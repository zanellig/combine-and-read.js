import site
for path in site.getsitepackages():
    print(path)

import sys
for path in sys.path:
    print(path)
