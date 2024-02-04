import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, send_file
from flask_cors import CORS


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///../database/db.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine, reflect=True)

# Save reference to the table
# print(Base.classes.keys())
Place = Base.classes.location
Fast_food = Base.classes.nutrition
Summary = Base.classes.summary

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)


#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    return send_file("templates/index.html")

    # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/quiz")
def quiz():
    return send_file("templates/quiz.html")

    # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/pygwalker")
def pygwalker():
    return send_file("templates/pygwalker.html")

     # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/location", methods=['GET'])
def get_data():
    # create session (link from python to db)
    session = Session(engine)

    # query the desired column
    results = session.query(Place).all()

    # close the session
    session.close()

    # Convert the results to a list of dictionaries
    data_list = [row.__dict__ for row in results]

    # Remove the '_sa_instance_state' key from each dictionary
    for item in data_list:
        item.pop('_sa_instance_state', None)

    # Convert list of dictionaries into JSON
    response = jsonify(data_list)

    # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/nutrition", methods=['GET'])
def get_data2():
    # create session (link from python to db)
    session = Session(engine)

    # query the desired column
    results = session.query(Fast_food).all()

    # close the session
    session.close()

    # Convert the results to a list of dictionaries
    data_list = [row.__dict__ for row in results]

    # Remove the '_sa_instance_state' key from each dictionary
    for item in data_list:
        item.pop('_sa_instance_state', None)

    # Convert list of dictionaries into JSON
    response = jsonify(data_list)

    # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/summary", methods=['GET'])
def get_data3():
    # create session (link from python to db)
    session = Session(engine)

    # query the desired column
    results = session.query(Summary).all()

    # close the session
    session.close()

    # Convert the results to a list of dictionaries
    data_list = [row.__dict__ for row in results]

    # Remove the '_sa_instance_state' key from each dictionary
    for item in data_list:
        item.pop('_sa_instance_state', None)

    # Convert list of dictionaries into JSON
    response = jsonify(data_list)

    # Add CORS header
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# run the app!
if __name__ == '__main__':
    app.run()