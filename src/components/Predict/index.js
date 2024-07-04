import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import Swal from "sweetalert2";
import './index.scss'

const Predict = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 10000)
  }, [])

  const [formData, setFormData] = useState({
    Age: "",
    Attrition: "No",
    BusinessTravel: "",
    DailyRate: "",
    Department: "",
    DistanceFromHome: "",
    Education: "",
    EducationField: "",
    EmployeeCount: "1",
    EmployeeNumber: "",
    EnvironmentSatisfaction: "",
    Gender: "",
    HourlyRate: "",
    JobInvolvement: "",
    JobLevel: "",
    JobRole: "",
    JobSatisfaction: "",
    MaritalStatus: "",
    MonthlyIncome: "",
    MonthlyRate: "",
    NumCompaniesWorked: "",
    Over18: "Y",
    OverTime: "",
    PercentSalaryHike: "",
    PerformanceRating: "",
    RelationshipSatisfaction: "",
    StandardHours: "80",
    StockOptionLevel: "",
    TotalWorkingYears: "",
    TrainingTimesLastYear: "",
    WorkLifeBalance: "",
    YearsAtCompany: "",
    YearsInCurrentRole: "",
    YearsSinceLastPromotion: "",
    YearsWithCurrManager: ""
  });
  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (!formData[key]) {
          Swal.fire({
            title: "Form Tidak Lengkap",
            text: "Isi form terlebih dahulu",
            icon: "error",
            showCloseButton: true,
            color: "red",
            confirmButtonColor: "red",
          });
          return;
        }
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.result === 0) {
        Swal.fire({
          title: "Rendah Berkemungkinan Turnover",
          text: "Hasil pemeriksaan menunjukkan bahwa indikasi employee untuk melakukan turnover rendah.",
          icon: "info",
          iconColor: "blue",
          color: "blue",
          showCloseButton: true,
          closeOnClickOutside: false,
          showConfirmButton: true,
        });
      } else if (result.result === 1) {
        Swal.fire({
          title: "Tinggi Berkemungkinan Turnover",
          text: "Hasil pemeriksaan menunjukkan bahwa indikasi employee untuk melakukan turnover tinggi.",
          icon: "warning",
          iconColor: "red",
          color: "red",
          showCloseButton: true,
          closeOnClickOutside: false,
          showConfirmButton: true,
        });
      }

      setFormData({
        Age: "",
        Attrition: "No",
        BusinessTravel: "",
        DailyRate: "",
        Department: "",
        DistanceFromHome: "",
        Education: "",
        EducationField: "",
        EmployeeCount: "1",
        EmployeeNumber: "",
        EnvironmentSatisfaction: "",
        Gender: "",
        HourlyRate: "",
        JobInvolvement: "",
        JobLevel: "",
        JobRole: "",
        JobSatisfaction: "",
        MaritalStatus: "",
        MonthlyIncome: "",
        MonthlyRate: "",
        NumCompaniesWorked: "",
        Over18: "Y",
        OverTime: "",
        PercentSalaryHike: "",
        PerformanceRating: "",
        RelationshipSatisfaction: "",
        StandardHours: "80",
        StockOptionLevel: "",
        TotalWorkingYears: "",
        TrainingTimesLastYear: "",
        WorkLifeBalance: "",
        YearsAtCompany: "",
        YearsInCurrentRole: "",
        YearsSinceLastPromotion: "",
        YearsWithCurrManager: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container predict-page">
        <h1 className='page-title'>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Prediksi Employee Turnover".split("")}
            idx={1}
          />
        </h1>
        <div className="predict-form">
          <form onSubmit={handleSubmit}>
            <ul>
              <li className="third">
                <input
                  name="Age"
                  id="Age"
                  className="form-control input-predict"
                  placeholder="Age"
                  value={formData.Age}
                  onChange={handleChange}
                />
              </li>
              <li style={{ display: "none" }}>
                <input
                  name="Attrition"
                  id="Attrition"
                  value={formData.Attrition}
                  onChange={handleChange}
                  type="hidden"
                />
              </li>
              <li className="third">
                <select
                  name="BusinessTravel"
                  id="BusinessTravel"
                  className={`form-control input-predict ${formData.BusinessTravel === "" ? 'select-color' : ''}`}
                  value={formData.BusinessTravel}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select BusinessTravel</option>
                  <option value="Travel_Rarely">Travel_Rarely</option>
                  <option value="Travel_Frequently">Travel_Frequently</option>
                  <option value="Non-Travel">Non-Travel</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="DailyRate"
                  id="DailyRate"
                  className="form-control input-predict"
                  placeholder="DailyRate"
                  value={formData.DailyRate}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <select
                  name="Department"
                  id="Department"
                  className={`form-control input-predict ${formData.Department === "" ? 'select-color' : ''}`}
                  value={formData.Department}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select Department</option>
                  <option value="Sales">Sales</option>
                  <option value="Research & Development">Research & Development</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="DistanceFromHome"
                  id="DistanceFromHome"
                  className="form-control input-predict"
                  placeholder="DistanceFromHome"
                  value={formData.DistanceFromHome}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="Education"
                  id="Education"
                  className="form-control input-predict"
                  placeholder="Education"
                  value={formData.Education}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <select
                  name="EducationField"
                  id="EducationField"
                  className={`form-control input-predict ${formData.EducationField === "" ? 'select-color' : ''}`}
                  value={formData.EducationField}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select EducationField</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Other">Other</option>
                  <option value="Medical">Medical</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Technical Degree">Technical Degree</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </li>
              <li style={{ display: "none" }}>
                <input
                  name="EmployeeCount"
                  id="EmployeeCount" 
                  value={formData.EmployeeCount}
                  onChange={handleChange}
                  type="hidden"
                />
              </li>
              <li className="third">
                <input
                  name="EmployeeNumber"
                  id="EmployeeNumber"
                  className="form-control input-predict"
                  placeholder="EmployeeNumber"
                  value={formData.EmployeeNumber}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="EnvironmentSatisfaction"
                  id="EnvironmentSatisfaction"
                  className="form-control input-predict"
                  placeholder="EnvironmentSatisfaction"
                  value={formData.EnvironmentSatisfaction}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <select
                  name="Gender"
                  id="Gender"
                  className={`form-control input-predict ${formData.Gender === "" ? 'select-color' : ''}`}
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="HourlyRate"
                  id="HourlyRate"
                  className="form-control input-predict"
                  placeholder="HourlyRate"
                  value={formData.HourlyRate}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="JobInvolvement"
                  id="JobInvolvement"
                  className="form-control input-predict"
                  placeholder="JobInvolvement"
                  value={formData.JobInvolvement}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="JobLevel"
                  id="JobLevel"
                  className="form-control input-predict"
                  placeholder="JobLevel"
                  value={formData.JobLevel}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <select
                  name="JobRole"
                  id="JobRole"
                  className={`form-control input-predict ${formData.JobRole === "" ? 'select-color' : ''}`}
                  value={formData.JobRole}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select JobRole</option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Research Scientist">Research Scientist</option>
                  <option value="Laboratory Technician">Laboratory Technician</option>
                  <option value="Manufacturing Director">Manufacturing Director</option>
                  <option value="Healthcare Representative">Healthcare Representative</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Research Director">Research Director</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="JobSatisfaction"
                  id="JobSatisfaction"
                  className="form-control input-predict"
                  placeholder="JobSatisfaction"
                  value={formData.JobSatisfaction}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <select
                  name="MaritalStatus"
                  id="MaritalStatus"
                  className={`form-control input-predict ${formData.MaritalStatus === "" ? 'select-color' : ''}`}
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select MaritalStatus</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="MonthlyIncome"
                  id="MonthlyIncome"
                  className="form-control input-predict"
                  placeholder="MonthlyIncome"
                  value={formData.MonthlyIncome}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="MonthlyRate"
                  id="MonthlyRate"
                  className="form-control input-predict"
                  placeholder="MonthlyRate"
                  value={formData.MonthlyRate}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="NumCompaniesWorked"
                  id="NumCompaniesWorked"
                  className="form-control input-predict"
                  placeholder="NumCompaniesWorked"
                  value={formData.NumCompaniesWorked}
                  onChange={handleChange}
                />
              </li>
              <li style={{ display: "none" }}>
                <input
                  name="Over18"
                  id="Over18"
                  value={formData.Over18}
                  onChange={handleChange}
                  type="hidden"
                />
              </li>
              <li className="third">
                <select
                  name="OverTime"
                  id="OverTime"
                  className={`form-control input-predict ${formData.OverTime === "" ? 'select-color' : ''}`}
                  value={formData.OverTime}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-form">Select OverTime</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </li>
              <li className="third">
                <input
                  name="PercentSalaryHike"
                  id="PercentSalaryHike"
                  className="form-control input-predict"
                  placeholder="PercentSalaryHike"
                  value={formData.PercentSalaryHike}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="PerformanceRating"
                  id="PerformanceRating"
                  className="form-control input-predict"
                  placeholder="PerformanceRating"
                  value={formData.PerformanceRating}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="RelationshipSatisfaction"
                  id="RelationshipSatisfaction"
                  className="form-control input-predict"
                  placeholder="RelationshipSatisfaction"
                  value={formData.RelationshipSatisfaction}
                  onChange={handleChange}
                />
              </li>
              <li style={{ display: "none" }}>
                <input
                  name="StandardHours"
                  id="StandardHours"
                  value={formData.StandardHours}
                  onChange={handleChange}
                  type="hidden"
                />
              </li>
              <li className="third">
                <input
                  name="StockOptionLevel"
                  id="StockOptionLevel"
                  className="form-control input-predict"
                  placeholder="StockOptionLevel"
                  value={formData.StockOptionLevel}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="TotalWorkingYears"
                  id="TotalWorkingYears"
                  className="form-control input-predict"
                  placeholder="TotalWorkingYears"
                  value={formData.TotalWorkingYears}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="TrainingTimesLastYear"
                  id="TrainingTimesLastYear"
                  className="form-control input-predict"
                  placeholder="TrainingTimesLastYear"
                  value={formData.TrainingTimesLastYear}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="WorkLifeBalance"
                  id="WorkLifeBalance"
                  className="form-control input-predict"
                  placeholder="WorkLifeBalance"
                  value={formData.WorkLifeBalance}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="YearsAtCompany"
                  id="YearsAtCompany"
                  className="form-control input-predict"
                  placeholder="YearsAtCompany"
                  value={formData.YearsAtCompany}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="YearsInCurrentRole"
                  id="YearsInCurrentRole"
                  className="form-control input-predict"
                  placeholder="YearsInCurrentRole"
                  value={formData.YearsInCurrentRole}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="YearsSinceLastPromotion"
                  id="YearsSinceLastPromotion"
                  className="form-control input-predict"
                  placeholder="YearsSinceLastPromotion"
                  value={formData.YearsSinceLastPromotion}
                  onChange={handleChange}
                />
              </li>
              <li className="third">
                <input
                  name="YearsWithCurrManager"
                  id="YearsWithCurrManager"
                  className="form-control input-predict"
                  placeholder="YearsWithCurrManager"
                  value={formData.YearsWithCurrManager}
                  onChange={handleChange}
                />
              </li>
              <li className="form-submit">
                <button type="submit" className="flat-button">SUBMIT</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Predict
