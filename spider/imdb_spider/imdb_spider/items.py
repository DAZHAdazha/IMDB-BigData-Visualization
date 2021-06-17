# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ImdbSpiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    className = 'imdb'
    movie_name = scrapy.Field()
    movie_url = scrapy.Field()
    movie_grade = scrapy.Field()
    review_title = scrapy.Field()
    review = scrapy.Field()
    movie_gross = scrapy.Field()
    movie_time = scrapy.Field()
    movie_genres = scrapy.Field()