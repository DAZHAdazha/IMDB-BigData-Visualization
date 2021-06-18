# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import csv


class ImdbSpiderPipeline():

    def __init__(self):
        self.file = open("data.csv", "a",encoding="utf-8-sig")
        # self.writer = csv.writer(self.file)
        self.writer = open("data.txt","w",encoding="utf-8")
        self.count = 0

    def process_item(self, item, spider):
        # self.writer.writerow([item['movie_name'], item['movie_url'],item['movie_grade']])
        # self.writer.writerow([item['movie_name'],item['review_title'],item['review']])
        # self.writer.writerow([item['movie_grade'],item['movie_name'],item['movie_gross']])
        self.writer.writelines(
            item['movie_name'] + "^*^" + item['review_title'] + "^*^" + item['review'] + "|||"
        )
        return item
