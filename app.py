from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import joblib
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__)

CORS(app, origins=["https://healthcareplus-1.onrender.com"])

# Load the trained model
model = joblib.load('symptom_diagnosis_model.pkl')

# Route for the home page
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/telemedicine_form')
def telemedicine_form():
    return render_template('telemedicine_form.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/disease_trends')
def disease_trends():
    return render_template('disease_trends.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Receive JSON data

    # Convert data into DataFrame to match the model input structure
    symptoms = pd.DataFrame([data])

    # Predict the diagnosis
    prediction = model.predict(symptoms)[0]

    # Return the prediction
    return jsonify({"diagnosis": prediction})

if __name__ == '__main__':
    app.run(debug=True)




























# Example dataset of symptoms and diseases
# data = {
#     'symptom1': ['fever', 'cough', 'fatigue', 'headache'],
#     'symptom2': ['cough', 'fever', 'headache', 'fatigue'],
#     'symptom3': ['fatigue', 'shortness of breath', 'fever', 'nausea'],
#     'disease': ['Flu', 'COVID-19', 'Migraine', 'Gastroenteritis']
# }

# # Load data into a pandas DataFrame
# df = pd.DataFrame(data)

# # Prepare features and labels
# X = df[['symptom1', 'symptom2', 'symptom3']]  # You can add more symptoms here
# y = df['disease']

# # Create and train the model
# model = DecisionTreeClassifier()
# model.fit(X, y)

# # Route for prediction
# @app.route('/predict', methods=['POST'])
# def predict():
#     symptoms = request.json['symptoms']

#     # Example: You may want to preprocess symptoms (lowercasing, etc.)
#     input_data = [symptoms['symptom1'], symptoms['symptom2'], symptoms['symptom3']]

#     # Predict the disease
#     prediction = model.predict([input_data])
#     return jsonify({'prediction': prediction[0]})


