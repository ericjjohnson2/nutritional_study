import pandas as pd

import sqlite3

# connect to db
conn = sqlite3.connect('places.sqlite')


# read the csv data into a dataframe
df = pd.read_csv('new_places.csv')
df2 = pd.read_csv('fastfood.csv')
df3 = pd.read_csv('summary_table.csv')

# send it to the database (replace 'passenger' with your table name and 'id' with your primary key column)
df.to_sql('place', conn, index=False, if_exists='replace', dtype={'id': 'INTEGER PRIMARY KEY'})
df2.to_sql('fast_food', conn, index=False, if_exists='replace', dtype={'id': 'INTEGER PRIMARY KEY'})
df3.to_sql('summary', conn, index=False, if_exists='replace', dtype={'id': 'INTEGER PRIMARY KEY'})
conn.close()

