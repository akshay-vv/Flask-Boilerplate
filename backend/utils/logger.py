import sys
import logging

logFormatter = logging.Formatter("%(asctime)s [%(threadName)-12.12s] [%(levelname)-5.5s]  %(message)s")
log = logging.getLogger()
log.setLevel(logging.INFO)

fileHandler = logging.FileHandler("app.log")
fileHandler.setFormatter(logFormatter)
log.addHandler(fileHandler)

consoleHandler = logging.StreamHandler(sys.stdout)
consoleHandler.setFormatter(logFormatter)
log.addHandler(consoleHandler)