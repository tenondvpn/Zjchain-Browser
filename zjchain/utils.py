import datetime


def str2r(str):
    return "'" + str + "'"


def fromtimestamp(timestamp):
    dt_object = datetime.datetime.fromtimestamp(int(timestamp / 1000) + 8 * 3600)
    return dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(timestamp % 1000)
