f = open('./data/top250reviews.txt',encoding="utf-8")
fw = open('./data/top250reviewsConvert.txt',encoding='utf-8',mode='w+')

text = f.read()
temp = []
# while text:
temp_text = text.split("|||")

for j in range(len(temp_text)):
        # print(temp_text[0])
    temp_line = temp_text[j].split("^*^")
    for i in range(len(temp_line)):
        if (temp_line[i] != ''):
            if(len(temp)<=2):
                temp.append(temp_line[i])
            else:
                fw.write(str(temp[0].replace("\n",'')) +"^^^"+ str(temp[1].replace("\n",'')) +"^^^"+ str(temp[2]).replace("\n",'') + "\n")
                temp = []
                temp.append(temp_line[i])

    # print(text)
    # text = f.readline()
