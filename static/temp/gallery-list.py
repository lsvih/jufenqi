# -*- coding:utf-8 -*-

#####################################################
#   Written By lsvih                                #
#   2016-10-12                                      #
#  Write file-struct of "img" folder to gallery.json#
#####################################################

import os

def getfilelist(filepath,fileType):
    if type(fileType)==list:
      print("list the files which type is " + "|".join(fileType))
    else:
      print("list the files which type is " + fileType)
    count = 0
    typeArray = '['
    filelist = os.listdir(filepath)
    for num in range(len(filelist)):
        print(filelist[num])
        if filelist[num].split(".")[1] in fileType:
            typeArray += '{"id":' + str(count) + ',"name":"' + filelist[num].split(".")[0] + '","url":"/static/temp/'+ filepath + filelist[num]  +'"},'
            count += 1
    return typeArray + ']'



o = open("class.json", "w+")
o.writelines(getfilelist("图库/",["jpg","png"]))
o.close()
print "Success!Please check gallery.json"
