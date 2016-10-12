# -*- coding:utf-8 -*-

#####################################################
#   Written By lsvih                                #
#   2016-10-12                                      #
#   Write file-struct of "img" folder to class.json  #
#####################################################

import os

def getfilelist(filepath,fileType):
    print("list the files which type is " + fileType)
    count = 0
    typeArray = '['
    filelist = os.listdir(filepath)
    for num in range(len(filelist)):
        print(filelist[num])
        if filelist[num].split(".")[1] == fileType:
            typeArray += '{"id":' + str(count) + ',"name":"' + filelist[num].split(".")[0] + '","url":"/static/images/'+ filepath + filelist[num]  +'"},'
            count += 1
    return typeArray + ']'



o = open("class.json", "w+")
o.writelines(getfilelist("品类列表/","jpg"))
o.close()
print "Success!Please check class.json"
