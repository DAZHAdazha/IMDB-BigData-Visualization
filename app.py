from flask import Flask, render_template
import os
from flask_sqlalchemy import SQLAlchemy
import pymysql


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


@app.route('/')
def hello_world():
    all = All.query.all()
    for i in all:
        print(i.name)
    print("ALL: "+str(all))
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
