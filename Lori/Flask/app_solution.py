import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///places.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())
Place = Base.classes.place

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/data/<column_name>", methods=['GET'])
def get_data(column_name):
    # create session (link from python to db)
    session = Session(engine)

    # query the desired column
    results = list(session.query(getattr(Place, column_name)))

    # close the session
    session.close()

    # Convert list of tuples into normal list
    all_values = list(np.ravel(results))
    response = jsonify([str(a) for a in all_values])

    # https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# run the app!
if __name__ == '__main__':
    app.run()