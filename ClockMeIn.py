# Import resources and initialize Flask application
from flask import Flask, render_template, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from datetime import datetime
import sqlite3
app = Flask(__name__)
api = Api(app)

conn = sqlite3.connect('employees.db')
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, name TEXT, clockIn TIME, clockOut TIME)")
conn.commit()
conn.close()

e = create_engine('sqlite:///employees.db')

# Functions

class Employees_Meta(Resource):
    def get(self):
        conn = e.connect()
        query = conn.execute("SELECT * FROM employees")
        result = {'employees': [dict(zip(tuple (query.keys()), i)) for i in query.cursor] }
        return result

# Routes
@app.route('/')
def welcome():
    return render_template('welcome.html')


@app.route('/', methods=['POST'])
def addAnEmployee():
    conn = sqlite3.connect('employees.db')
    c = conn.cursor()
    firstName = request.form['firstname']
    lastName = request.form['lastname']
    c.execute("INSERT INTO employees (name) VALUES (?)", [(firstName + " " + lastName)])
    conn.commit()
    conn.close()
    return "SUCCESS!"

@app.route('/', methods=['POST'])
def clockIn(data):
    conn = e.connect()
    currentTime = str(datetime.now())
    employeeID = data.employeeID;
    query = conn.execute("UPDATE employees SET clockIn =" + currentTime + " WHERE id=" + employeeID)
    conn.commit()
    conn.close()




api.add_resource(Employees_Meta, '/api/v1/employees')

app.run(debug=True)
