# import csv
# csv_reader = csv.reader(open("./top250.csv"))
s = 'https://www.imdb.com/search/title/?genres=comedy&start='
e = '&explore=title_type,genres&ref_=adv_prv'
print("[")
i = 1
for c in range(int(10001/50)):
    print("'"+s+str(i)+e+"',")
    i = i+50
print("]")