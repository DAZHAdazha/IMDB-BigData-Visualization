from pyspark.sql.session import SparkSession
import csv

spark = SparkSession.builder.appName("demo").master("local[2]").getOrCreate()
sc = spark.sparkContext


def mapFunction(data):
  temp = int("".join(filter(str.isdigit, data[2])))
  return (temp,data[0])

if __name__=="__main__":
  inputFile = "./data/top250gross.csv"

  df = spark.read.csv(inputFile, encoding='utf-8',
                      inferSchema=True)  # header表示数据的第一行是否为列名，inferSchema表示自动推断schema,此时未指定schema
  pairRdd = df.rdd.map(mapFunction)
  sortRdd = pairRdd.sortByKey(ascending=False)

  ls = []
  ls = sortRdd.collect()
  # print(pairRdd.collect())
  print(ls)
  print(sortRdd.count())

  selectList = []
  for i in range(len(ls)):
    if(i%8==0):
      selectList.append(ls[i])

  print(len(selectList))

  with open('relation.csv', 'w+')as f:
    f_csv = csv.writer(f)
    f_csv.writerows(selectList)

