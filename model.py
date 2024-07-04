import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split, RandomizedSearchCV
import warnings
import joblib

# Suppress warnings
warnings.filterwarnings('ignore')

# Load dataset
attrition = pd.read_csv('./WA_Fn-UseC_-HR-Employee-Attrition.csv')

# Define a dictionary for the target mapping
target_map = {'Yes': 1, 'No': 0}
# Use the pandas apply method to numerically encode our attrition target variable
attrition["Attrition_numerical"] = attrition["Attrition"].apply(lambda x: target_map[x])

# Refining our list of numerical variables
numerical = [u'Age', u'DailyRate', u'JobSatisfaction',
             u'MonthlyIncome', u'PerformanceRating',
             u'WorkLifeBalance', u'YearsAtCompany', u'Attrition_numerical']

# Drop the Attrition_numerical column from attrition dataset first
attrition = attrition.drop(['Attrition_numerical'], axis=1)

# Identify categorical columns
categorical = [col for col in attrition.columns if attrition[col].dtype == 'object']

# Identify numerical columns
numerical = attrition.columns.difference(categorical)

# Prepare categorical data
attrition_cat = attrition[categorical].drop(['Attrition'], axis=1)
attrition_cat = pd.get_dummies(attrition_cat)

# Prepare numerical data
attrition_num = attrition[numerical]

# Concatenate numerical and categorical data
attrition_final = pd.concat([attrition_num, attrition_cat], axis=1)

# Encode target variable
target_map = {'Yes': 1, 'No': 0}
target = attrition["Attrition"].apply(lambda x: target_map[x])

# Oversample the data using SMOTE
oversampler = SMOTE(sampling_strategy='auto', random_state=32)
smote_train, smote_target = oversampler.fit_resample(attrition_final, target)

# Apply PCA
pca = PCA(n_components=28, random_state=32, whiten=True)
smote_train_pca = pca.fit_transform(smote_train)

# Split data into train and test sets
train_pca, val_pca, target_train_pca, target_val_pca = train_test_split(smote_train_pca, smote_target, train_size=0.8, random_state=32)

# Define the parameter grid for RandomizedSearchCV
param_grid = {
    'n_estimators': [600],
    'max_features': ['log2'],
    'max_depth': [18],
    'min_samples_split': [2],
    'min_samples_leaf': [1],
    'bootstrap': [False]
}

# Initialize the Random Forest classifier
rf = RandomForestClassifier(random_state=32)

# Initialize RandomizedSearchCV
rf_random = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_grid,
    n_iter=100,  # Number of parameter settings sampled
    cv=3,        # 3-fold cross-validation
    verbose=2,
    random_state=32,
    n_jobs=-1
)

# Fit RandomizedSearchCV on the training data
rf_random.fit(train_pca, target_train_pca)

# Get the best estimator
best_rf = rf_random.best_estimator_

# Create a custom model class to encapsulate SMOTE, PCA, and RandomForest
class AttritionModel:
    def __init__(self, model, pca, smote):
        self.model = model
        self.pca = pca
        self.smote = smote

    def predict(self, data):
        # Apply SMOTE transformation (dummy here, since in practice, SMOTE is used for training)
        # data_smote, _ = self.smote.fit_resample(data, [0]*len(data))  # Assuming no target for new data
        data_pca = self.pca.transform(data)
        return self.model.predict(data_pca)

# Initialize the custom model with the best estimator, PCA, and SMOTE
attrition_model = AttritionModel(model=best_rf, pca=pca, smote=oversampler)

# Save the custom model using joblib
with open('turnover_model.pkl', 'wb') as file:
    joblib.dump(attrition_model, file)

# Make predictions on the validation set using the best estimator
rf_predictions = best_rf.predict(val_pca)

# Evaluate model performance
accuracy = accuracy_score(target_val_pca, rf_predictions)
classification_rep = classification_report(target_val_pca, rf_predictions)