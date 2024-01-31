import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify


# #################################################
# # Database Setup
# #################################################
engine = create_engine("sqlite:///../data/chain_db.sqlite")

inspector = inspect(engine)
print(inspector.get_table_names())

# # reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(engine, reflect=False)

# Place = Base.classes.place
# Fast_food = Base.classes.fast_food
# Summary_stats = Base.classes.summary_stats

metadata = Base.metadata
Place = metadata.tables['place']
Fast_food = metadata.tables['fast_food']
Summary_stats = metadata.tables['summary_stats']

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# code from below was sourced from ChatGPT

@app.route("/api/data", methods=['GET'])
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

@app.route("/api/data2", methods=['GET'])
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

@app.route("/api/data3", methods=['GET'])
def get_data3():
    # create session (link from python to db)
    session = Session(engine)

    # query the desired column
    results = session.query(Summary_stats).all()

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