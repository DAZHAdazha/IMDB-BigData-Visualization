from pyspark.sql.session import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, Row, LongType,DoubleType

import csv

spark = SparkSession.builder.appName("demo").master("local[2]").getOrCreate()
sc = spark.sparkContext


def mapFunction(data):
  temp = int("".join(filter(str.isdigit, data[2])))
  return (temp,data[0])

def mapFunctionFull(data):
  temp = int("".join(filter(str.isdigit, data[2])))
  return (temp,data[0],data[1])

if __name__=="__main__":
  inputFile = "./data/top250gross.csv"

  df = spark.read.csv(inputFile, encoding='utf-8',
                      inferSchema=True)  # header表示数据的第一行是否为列名，inferSchema表示自动推断schema,此时未指定schema
  pairRdd = df.rdd.map(mapFunction)
  sortRdd = pairRdd.sortByKey(ascending=False)

  pairRddFull = df.rdd.map(mapFunctionFull)
  sortRddFull = pairRddFull.sortByKey(ascending=False)

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

    # 创建schema对象
    schema = StructType(
      [ StructField("gross", LongType(), True),StructField("grade", DoubleType(), True),StructField("name", StringType(), True),]
    )

    # 构建行对象row

    # 将schema应用到rdd上，使用createDataFrame创建DataFrame
    customerinfo_df = spark.createDataFrame(sortRddFull, schema)
    # 构建连接数据库的参数

    database_conf = {}
    database_conf["user"] = "root"
    database_conf["password"] = "fengyunjia"
    database_conf["dirver"] = "com.mysql.cj.jdbc.Driver"

    customerinfo_df.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="top250", mode="append", properties=database_conf)


