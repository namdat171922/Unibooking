#!/usr/bin/env python
try:
    import server
    print("Import successful")
except Exception as e:
    import traceback
    print("Import failed:")
    traceback.print_exc()
