import sqlite3

conn = sqlite3.connect('places.sqlite')
cursor = conn.cursor()

create_table_query = '''
CREATE TABLE summary2 AS
SELECT place.*, summary.*
FROM place
INNER JOIN summary ON place.restaurant = summary.restaurant
'''

cursor.execute(create_table_query)

conn.commit()
conn.close()