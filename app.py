import pandas as pd
from flask import Flask
from flask import render_template
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
	
@app.route("/data")
def get_data():
    df = pd.read_csv("data/chegadas_total.csv", encoding="latin_1", sep=',')
	#Get n_samples records
    n_samples = len(df.index)
    df = df.sample(n=n_samples)
    df = df.dropna()
    df = df[df['Estado'] != "Outras Unidades da Federação"]
    df = df[df['Continente'] != "Not Informed"]
    return df.to_json(orient='records')	

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000,debug=True)