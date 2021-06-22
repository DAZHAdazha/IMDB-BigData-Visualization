import matplotlib.pyplot as plt  # 数据可视化
import wordcloud  # 分词
from wordcloud import WordCloud, ImageColorGenerator, STOPWORDS  # 词云，颜色生成器，停止词
import numpy as np
from PIL import Image


def ciyun():
    with open('wordCLoudData.csv', 'r', encoding='utf-8') as f:  # 打开新的文本转码为gbk
        space_list = f.read()  # 读取文本内容
    # print(space_list)

    backgroud = np.array(Image.open('IMDB.png'))

    wc = WordCloud(width=1400, height=1400,
                   background_color=None,
                   mode='RGBA',
                   mask=backgroud,  # 添加蒙版，生成指定形状的词云，并且词云图的颜色可从蒙版里提取
                   max_words=500,
                   font_path='C:\Windows\Fonts\STZHONGS.ttf',
                   max_font_size=150,
                   relative_scaling=0.6,  # 设置字体大小与词频的关联程度为0.4
                   random_state=50,
                   scale=2,
                   colormap="cool",
                   ).generate(space_list)

    # image_color = ImageColorGenerator(backgroud)  # 设置生成词云的颜色，如去掉这两行则字体为默认颜色
    # wc.recolor(color_func="White")

    plt.imshow(wc)  # 显示词云
    plt.axis('off')  # 关闭x,y轴
    plt.show()  # 显示
    wc.to_file('cloud.png')  # 保存词云图


def main():
    ciyun()


if __name__ == '__main__':
    main()