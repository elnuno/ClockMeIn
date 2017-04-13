# Import and initialize Flask application
from flask import Flask, render_template, request
from datetime import datetime
import sqlite3
app = Flask(__name__)


# SQL Functions

# Routes
@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/', methods=['POST'])
def addAnEmployee():
    conn = sqlite3.connect('employees.db');
    c = conn.cursor();
    firstName = request.form['firstname'];
    lastName = request.form['lastname'];
    c.execute("CREATE TABLE " + firstName + lastName + "(ID, clockIn, clockOut)");
    conn.close();
    return "SUCCESS!";

app.run(debug=True)
