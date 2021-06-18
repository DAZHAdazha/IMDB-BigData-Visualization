from pyspark.sql.session import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, Row, LongType,DoubleType

import csv

spark = SparkSession.builder.appName("demo").master("local[2]").getOrCreate()
sc = spark.sparkContext

def myMapFunction(data):
  dataList = str(data).split("^^^")
  return dataList[0][11:],dataList[1].replace(' ', '').split(","),dataList[2][:-2]

def myCountFun(data):
  dic = {}
  for i in range(len(data[1])):
    if data[1][i] in dic.keys():
      dic[data[1][i]] += 1
    else:
      dic[data[1][i]] = 0
  return data[0],dic


def generateList(data):
  for key in data[1]:
    sc.myList.append((data[0],key,data[1][key]))

if __name__=="__main__":
  inputFile = "./data/newAllConvert.txt"

  df = spark.read.text(inputFile)
  pairRdd = df.rdd.map(myMapFunction)
  # pairRdd.collect()

  typeRdd = pairRdd.map(lambda data:data[1])

  #flatMap将所有值展平，列表打开
  allRdd = typeRdd.flatMap(lambda list:list)
  myPairRdd = allRdd.map(lambda x:(x,1))
  reduceRdd = myPairRdd.reduceByKey(lambda x,y:x+y)

  # reduceRdd.collect()

  timePairRdd = pairRdd.map(lambda data:(data[2],1))
  timeCountRdd = timePairRdd.reduceByKey(lambda x,y:x+y)

  # timePairRdd.collect()

  yearPairRdd = pairRdd.map(lambda data:(data[2],data[1]))
  yearReduceRdd = yearPairRdd.reduceByKey(lambda x,y:x+y)
  yearCountRdd = yearReduceRdd.map(myCountFun)

  myList = yearCountRdd.collect()
  finalList = []
  for i in myList:
    for key in i[1]:
      finalList.append([i[0],key,i[1][key]])
  trendRdd = sc.parallelize(finalList)
  trendRdd.collect()



    #创建schema对象
  schema = StructType(
      [StructField("name", StringType(), True),StructField("type", StringType(), True),StructField("time", StringType(), True)]
    )

    # 构建行对象row

    # 将schema应用到rdd上，使用createDataFrame创建DataFrame
  customerinfo_df = spark.createDataFrame(pairRdd, schema)
    # 构建连接数据库的参数
  #
  database_conf = {}
  database_conf["user"] = "root"
  database_conf["password"] = "fengyunjia"
  database_conf["dirver"] = "com.mysql.cj.jdbc.Driver"

  customerinfo_df.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="allMovies", mode="append", properties=database_conf)

  schema2 = StructType(
      [StructField("type", StringType(), True),StructField("num", LongType(), True)]
    )
  customerinfo_df2 = spark.createDataFrame(reduceRdd, schema2)
  customerinfo_df2.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="types", mode="append", properties=database_conf)

  schema3 = StructType(
      [StructField("year", StringType(), True),StructField("num", LongType(), True)]
    )
  customerinfo_df3 = spark.createDataFrame(timeCountRdd, schema3)
  customerinfo_df3.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="years", mode="append", properties=database_conf)

  schema4 = StructType(
      [StructField("time", StringType(), True),StructField("type", StringType(), True),StructField("num", LongType(), True)]
    )
  customerinfo_df4 = spark.createDataFrame(trendRdd, schema4)
  customerinfo_df4.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="trend", mode="append", properties=database_conf)

