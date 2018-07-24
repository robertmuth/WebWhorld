#!/usr/bin/python3

import sys
import os

FILE_PROLOG = '''import 'parameter.dart';

final Map<String, Parameters> AllConfigs = {
'''

FILE_EPILOG = '''
};
'''


PROLOG = '''
  "%s": Parameters(ReadParameter("""
'''

EPILOG = '''
""")),
'''

custom = None


def emit(text):
    sys.stdout.write(text)


emit(FILE_PROLOG)
for fn in sys.argv[1:]:
    name, _ = os.path.splitext(os.path.basename(fn))
    name = name.title()
    name = name.replace("_", " ")
    name = name.replace(" ", "")
    content = open(fn).read()
    if name == 'Default':
        custom = content
    emit(PROLOG % name)
    emit(content)
    emit(EPILOG)

emit(PROLOG % "Custom")
emit(custom)
emit(EPILOG)
emit(FILE_EPILOG)
