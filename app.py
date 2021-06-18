from flask import Flask, render_template, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
import json


app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:991123@localhost:3306/imdbmovie?charset=utf8'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

models = SQLAlchemy(app)


class All(models.Model):
    __tablename__ = 'all'  # 表名
    name = models.Column(models.String(), primary_key=True)
    time = models.Column(models.String())
    type = models.Column(models.String())


class Top250(models.Model):
    __tablename__ = 'top250'    # 表名
    ID = models.Column(models.Integer(), primary_key=True)
    name = models.Column(models.String())
    grade = models.Column(models.Float())
    gross = models.Column(models.Integer())

    def top10(self):
        # 获取前十项
        # 返回一个列表
        return self.query.limit(10).all()

    def top10OrderByGross(self):
        # 获取票房前十项
        # 返回一个列表
        return self.query.order_by(Top250.gross).limit(10).all()

    def getGrades(self):
        # 获取全部的grade
        grades = []
        for movie in self.query.group_by(self.grade).all():
            if movie.grade not in grades:
                grades.append(movie.grade)
        return sorted(grades)

    def getGross(self):
        grades = self.getGrades()
        numGrades = len(grades)
        num = []
        res = []
        for i in range(numGrades):
            res.append(0)
            num.append(0)

        for movie in self.query.group_by(self.grade).all():
            for i in range(numGrades):
                if grades[i] == movie.grade:
                    res[i] = res[i] + movie.gross
                    num[i] += 1
                    break
        for i in range(numGrades):
            res[i] = (res[i]/num[i])//100000
        return res

    def to_json(self):
        """将实例对象转化为json"""
        item = self.__dict__
        if "_sa_instance_state" in item:
            del item["_sa_instance_state"]
        return item


def to_json(list):
    # json转换
    value_list = [i.to_json() for i in list]
    return json.dumps(value_list, indent=2, ensure_ascii=False)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route("/top10/")
def top10s():
    movies = Top250()
    return to_json(movies.top10())


@app.route("/top10gross/")
def top10gross():
    movies = Top250()
    return to_json(movies.top10OrderByGross())


@app.route("/grades/")
def grades():
    movies = Top250()
    return json.dumps(movies.getGrades())


@app.route("/gross/")
def movieGrades():
    movies = Top250()
    return json.dumps(movies.getGross())

if __name__ == '__main__':
    app.run()
