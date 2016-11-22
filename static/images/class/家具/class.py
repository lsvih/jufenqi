# -*- coding:utf-8 -*-

#####################################################
#   Written By lsvih                                #
#   2016-11-22                                      #
#   Write file-struct of folder to class.json       #
#####################################################

import os

def getfilelist(filepath):
    count = 0
    typeArray = '['
    filelist = os.listdir(filepath)
    for num in range(len(filelist)):
        print(filelist[num])
        if filelist[num].split(".")[1] is not 'py':
            typeArray += '{"id":' + str(count) + ',"name":"' + filelist[num].split(".")[0] + '","url":"/static/images/class/家具/' + filelist[num]  +'"},'
            count += 1
    return typeArray + ']'



o = open("家具.json", "w+")
o.writelines(getfilelist("./"))
o.close()
print "Success!Please check class.json"
