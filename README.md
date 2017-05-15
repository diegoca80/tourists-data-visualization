#Authors

Diego Alves
Adriano Orsoni

#Dependencies

You need Python 3 libraries: Pandas, Flask.

The easiest way to install Pandas is to install it as part of the Anaconda distribution.

You can install Flask using pip.

	pip install flask

#How to run the code

1. Install all Python dependencies

2. Open command terminal and cd to root folder:
> cd []\tourists-data-visualization

3. Run Python script:
> python app.py

4. Open web-browser and access local server http://0.0.0.0:8000/


#How to interact with plots

1. Graph 'Chegada de turistas por ano'
- Select range of years to display;
- Move selected region left or right;
- Expand or shrink selected region;
- Click outside of the selected region to select all years.

2. Graph 'Meio de transporte'
- Click on desired Transportation Mean to select it;
- Click on multiple Transportation Means to select multiple means;
- Click on single selected mean to select all means at once.

3. Graph 'Numero de turistas'
- This box shows the total number of tourists under consideration. There is no interactivity with it.

4. Graph 'Continente'
- Click on desired Continent to select it;
- Click on multiple Continents to select multiple continents;
- Click on single selected continent to select all continents at once.

5. Graph 'Estado Destino'
- Click on desired State to select it;
- Click on multiple States to select multiple states;
- Click on single selected state to select all states at once.

Example:

![Alt text](static/img/dashboard.gif?raw=true "Dashboard Tourists Data Visualization")

