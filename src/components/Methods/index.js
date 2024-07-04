import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import rf from '../../assets/images/rf.png'
import smote from '../../assets/images/smote.png'
import pca from '../../assets/images/pca.jpg'
import rscv from '../../assets/images/rscv.png'

const Methods = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  })

  return (
    <>
      <div className="container methods-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Metode'.split('')}
            idx={15}
          />
        </h1>
        <div>
          <div className="images-container">
            <div className="image-box">
              <img src={rf} className="methods-image" alt="methods" />
              <div className="content">
                <p className="title">Random Forest Classifier</p>
                <h4 className="description">Algoritma Klasifikasi</h4>
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      'https://www.datacamp.com/tutorial/random-forests-classifier-python'
                    )
                  }
                >
                  Detail
                </button>
              </div>
            </div>
            <div className="image-box">
              <img src={smote} className="methods-image" alt="methods" />
              <div className="content">
                <p className="title">SMOTE</p>
                <h4 className="description">Penyeimbang Kelas</h4>
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      'https://www.analyticsvidhya.com/blog/2020/10/overcoming-class-imbalance-using-smote-techniques'
                    )
                  }
                >
                  Detail
                </button>
              </div>
            </div>
            <div className="image-box">
              <img src={pca} className="methods-image" alt="methods" />
              <div className="content">
                <p className="title">PCA</p>
                <h4 className="description">Reduksi Dimensi</h4>
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      'https://builtin.com/data-science/step-step-explanation-principal-component-analysis'
                    )
                  }
                >
                  Detail
                </button>
              </div>
            </div>
            <div className="image-box">
              <img src={rscv} className="methods-image" alt="methods" />
              <div className="content">
                <p className="title">RandomSearchCV</p>
                <h4 className="description">Hyperparameter Tuning</h4>
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html'
                    )
                  }
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Methods
