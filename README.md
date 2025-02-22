# Project-3-Fastfood Topic: Nutritional Content of Fast Food

## An overview of the project and its purpose
Group 3 focused on data visualization of the nutritional content of food sold at eight major chain fast food restaurants located in the [Twin Cities, Minnesota](https://en.wikipedia.org/wiki/Minneapolis%E2%80%93Saint_Paul). Our datasets will allow users to analyze/compare several nutritional values:
*	calories
*	protein
*	sodium
*	carbohydrates
*	fat
*	sugar
*	cholesterol
*	fiber

We have created visualizations to display the nutritional content of specific foods and allow users to compare food items. We also created an interactive quiz to help visitors make informed choices when ordering some of America's favorite fast foods.
  
## Instructions on how to use and interact with the project
### Homepage
Upon loading the routes.py file, users will be directed to a homepage featuring a series of navigation links, two drop-down menus, and a Leaflet map:
![image](https://github.com/Chud-rf/Project-3-Fastfood/assets/140283164/f7d80035-ea1d-4045-b4cd-834730d979e0)
- The links will take users to additional interactive visualizations, which are laid out in more detail below.
- The drop-down menus allow users to compare two fast food items based on their calories, protein, sodium, and fiber content.
- The map plots the locations of 8 fast-food restaurants in the Twin Cities metro area. The map contains a legend that corresponds to the color-coded markers, which differentiate the various restaurants. Users can toggle certain restaurants on and off using the overlay in the top right corner. When users click on a marker, a popup displays the restaurant’s name, address, and user rating provided by Google Maps. A double-click on a marker also triggers a zoom function, enabling users to examine the selected restaurant and its surrounding area more closely.

### PyGWalker
![image](https://github.com/Chud-rf/Project-3-Fastfood/blob/main/app/static/img/viz%20screenshot.png)
- Users can interact with [PyGWalker](https://docs.kanaries.net/pygwalker), a newer Python Library for Exploratory Data Analysis with Visualization. The PyGWalker visualizations show the median or mean macro- and micro-nutrients across all fast food restaurants, as well as the relationships between select nutrients. Last, nutrient relationships are compared between the two burger chains.

### Fast Food Quiz
![image](https://github.com/Chud-rf/Project-3-Fastfood/assets/140283164/49a8b92c-4a8f-4e24-94b6-faf1c1752930)
- Users can navigate to the fast food quiz to test their knowledge of fast food nutritional content. Users will be prompted with a question and 4-8 multiple-choice options. When they click on one of the options, the quiz will let them know if they are correct or not. After a moment, the next question will load.

## Ethical considerations made in the project:
Ethical considerations made for this project: We chose to not utilize web scraping for pricing data since fast food companies as well as websites with pricing data specifically stated we could not scrape data. After researching the restaurants’ Terms of Service posted on their websites, we decided not to post any company logos on our project. Doing so would require written consent from many of the chains since a company’s logo and marks are viewed as proprietary material. Burger King’s website was the strictest, listing out several types of prohibited content and activities, not limited to spidering, scraping, harvesting, reverse engineering, deciphering, or attempting to circumvent any software that’s part of the Services. All chains' websites referenced the Children’s Online Privacy Protection Act of 1998.

## References for the data source(s):
### PyGWalker references:
- https://github.com/Kanaries/pygwalker
- https://www.youtube.com/watch?v=Ynt7Etci1KU
- https://stackoverflow.com/questions/36351109/ipython-notebook-ipywidgets-does-not-show
### Flask reference:
- https://www.digitalocean.com/community/tutorials/how-to-use-an-sqlite-database-in-a-flask-application
### Fast Food Dataset:
- https://www.kaggle.com/datasets/ulrikthygepedersen/fastfood-nutrition
### Quiz Facts:
- https://www.fda.gov/food/food-labeling-nutrition/nutrition-education-resources-materials
- https://www.cspinet.org/protecting-our-health/menu-labeling
- https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/carbohydrates/art-20045705#:~:text=How%20many%20carbohydrates%20do%20you,grams%20of%20carbs%20a%20day.
### Google Places API
- https://developers.google.com/maps/documentation/places/web-service

## References for any code used that is not your own
- Basic Quiz Code
     - https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2
- Flask app route code - assistance from ChatGPT
- Map Code
     - Help to set the background color of the legend [here](https://codepen.io/haakseth/pen/KQbjdO). 
     - Code found here for fit bounds in leaflet found [here](https://jeffreymorgan.io/articles/how-to-center-a-leaflet-map-on-a-marker/).
     - Support setting up the legend found [here](https://codepen.io/haakseth/pen/KQbjdO) and html color identification found [here](https://htmlcolorcodes.com/).
     - Code for word-wrap in legend found [here](https://stackoverflow.com/questions/3587390/how-can-i-make-text-appear-on-next-line-instead-of-overflowing)
