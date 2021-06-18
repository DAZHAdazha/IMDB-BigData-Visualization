from pyspark.sql.session import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, Row, LongType,DoubleType

import csv

spark = SparkSession.builder.appName("demo").master("local[2]").getOrCreate()
sc = spark.sparkContext

def myMapFunction(data):
  dataList = str(data).split("^^^")
  return dataList[0][11:],dataList[1],dataList[2][:-2]


if __name__=="__main__":
  inputFile = "./data/newAllConvert.txt"

  df = spark.read.text(inputFile)
  pairRdd = df.rdd.map(myMapFunction)


  # print(pairRdd.collect())


    #创建schema对象
  schema = StructType(
      [StructField("name", StringType(), True),StructField("type", StringType(), True),StructField("time", StringType(), True)]
    )

    # 构建行对象row

    # 将schema应用到rdd上，使用createDataFrame创建DataFrame
  customerinfo_df = spark.createDataFrame(pairRdd, schema)
    # 构建连接数据库的参数

  database_conf = {}
  database_conf["user"] = "root"
  database_conf["password"] = "fengyunjia"
  database_conf["dirver"] = "com.mysql.cj.jdbc.Driver"

  customerinfo_df.write.jdbc(url="jdbc:mysql://localhost:3306/imdbmovie?serverTimezone=Asia/Shanghai&useSSL=false",
                               table="allMovies", mode="append", properties=database_conf)


