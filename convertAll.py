f = open('./data/newAll.csv',encoding="utf-8")
fw = open('./data/newAllConvert.txt',encoding='utf-8',mode='w+')

temp = []

text = f.read().replace("\n",'').replace("\ufeff",'')

text = text.split('"')
for i in range(len(text)):
    temp_text = text[i].split("]")
    for j in range(len(temp_text)):
        if(len(temp)<=2):
            if(len(temp)==2):
                myTemp = temp_text[j].replace(",['(","")
                count = 0
                tempStr = ""
                index = 0
                if(myTemp!=",[" and myTemp!="TV Movie)'" and myTemp != "I)'" and myTemp != "Video Game)'"
                        and myTemp != "II)'"and myTemp != "XI)'"and myTemp != "III)'"and myTemp != "IV)'"):
                    while count<4:
                        if(myTemp[index].isdigit()):
                            tempStr+=myTemp[index]
                            count+=1
                        index+=1
                    temp.append(tempStr)
                else:
                    temp = []

            else:
                temp.append(temp_text[j].replace(",['(", "").strip())
        else:
            print(temp)
            fw.write(str(temp[0]) + "^^^" + str(temp[1]) + "^^^" +str(temp[2]) + "\n")

            temp = []
            temp.append(temp_text[j][:-1])

