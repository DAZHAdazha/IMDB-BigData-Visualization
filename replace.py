f = open('./data/all.csv',encoding="utf-8")
fw = open('./data/newAll.csv',encoding="utf-8",mode="w+")



text = f.readline()
while text:
    if(text[0]=='"'):
        newText = text[1:].replace('","',',"')
        fw.write(newText)
    else:
        fw.write(text)
    text = f.readline()