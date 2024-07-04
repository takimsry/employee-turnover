from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from model import AttritionModel

app = Flask(__name__)
CORS(app)

# Load model
model_path = "turnover_model.pkl"
with open(model_path, 'rb') as file:
    attrition_model = joblib.load(file)

# Load dataset to align columns
csv_turnover_path = "WA_Fn-UseC_-HR-Employee-Attrition.csv"
turnover = pd.read_csv(csv_turnover_path)

# Identify categorical and numerical columns
categorical = [col for col in turnover.columns if turnover[col].dtype == 'object']
numerical = turnover.columns.difference(categorical)

@app.route("/dataset")
def dataset():
    data = turnover.to_dict(orient="records")
    return jsonify(data)

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        print("Received data:", data)

        required_fields = [
            'Age', 'Attrition', 'BusinessTravel', 'DailyRate', 'Department', 'DistanceFromHome',
            'Education', 'EducationField', 'EmployeeCount', 'EmployeeNumber',
            'EnvironmentSatisfaction', 'Gender', 'HourlyRate', 'JobInvolvement',
            'JobLevel', 'JobRole', 'JobSatisfaction', 'MaritalStatus', 'MonthlyIncome',
            'MonthlyRate', 'NumCompaniesWorked', 'Over18', 'OverTime', 'PercentSalaryHike',
            'PerformanceRating', 'RelationshipSatisfaction', 'StandardHours',
            'StockOptionLevel', 'TotalWorkingYears', 'TrainingTimesLastYear',
            'WorkLifeBalance', 'YearsAtCompany', 'YearsInCurrentRole',
            'YearsSinceLastPromotion', 'YearsWithCurrManager'
        ]

        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing field: {field}")

        input_data = {
            'Age': float(data['Age']),
            'Attrition': data['Attrition'],
            'BusinessTravel': data['BusinessTravel'],
            'DailyRate': float(data['DailyRate']),
            'Department': data['Department'],
            'DistanceFromHome': float(data['DistanceFromHome']),
            'Education': float(data['Education']),
            'EducationField': data['EducationField'],
            'EmployeeCount': float(data['EmployeeCount']),
            'EmployeeNumber': float(data['EmployeeNumber']),
            'EnvironmentSatisfaction': float(data['EnvironmentSatisfaction']),
            'Gender': data['Gender'],
            'HourlyRate': float(data['HourlyRate']),
            'JobInvolvement': float(data['JobInvolvement']),
            'JobLevel': float(data['JobLevel']),
            'JobRole': data['JobRole'],
            'JobSatisfaction': float(data['JobSatisfaction']),
            'MaritalStatus': data['MaritalStatus'],
            'MonthlyIncome': float(data['MonthlyIncome']),
            'MonthlyRate': float(data['MonthlyRate']),
            'NumCompaniesWorked': float(data['NumCompaniesWorked']),
            'Over18': data['Over18'],
            'OverTime': data['OverTime'],
            'PercentSalaryHike': float(data['PercentSalaryHike']),
            'PerformanceRating': float(data['PerformanceRating']),
            'RelationshipSatisfaction': float(data['RelationshipSatisfaction']),
            'StandardHours': float(data['StandardHours']),
            'StockOptionLevel': float(data['StockOptionLevel']),
            'TotalWorkingYears': float(data['TotalWorkingYears']),
            'TrainingTimesLastYear': float(data['TrainingTimesLastYear']),
            'WorkLifeBalance': float(data['WorkLifeBalance']),
            'YearsAtCompany': float(data['YearsAtCompany']),
            'YearsInCurrentRole': float(data['YearsInCurrentRole']),
            'YearsSinceLastPromotion': float(data['YearsSinceLastPromotion']),
            'YearsWithCurrManager': float(data['YearsWithCurrManager'])
        }

        input_df = pd.DataFrame([input_data])

        # Preprocess the input data similarly to how the training data was processed
        input_cat = pd.get_dummies(input_df[categorical])
        input_num = input_df[numerical]

        input_final = pd.concat([input_num, input_cat], axis=1)

        # Align columns with training data
        missing_cols = set(attrition_model.smote.get_feature_names_out()) - set(input_final.columns)
        for col in missing_cols:
            input_final[col] = 0
        input_final = input_final[attrition_model.smote.get_feature_names_out()]

        # Make predictions using the loaded model
        prediction = attrition_model.predict(input_final)
        result = int(prediction[0])
        return jsonify(result=result)
    except Exception as e:
        print("Error:", str(e))
        return jsonify(error=str(e)), 400

if __name__ == "__main__":
    app.run(debug=True)