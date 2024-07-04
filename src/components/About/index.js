import { useEffect, useState } from 'react'
import {
  faSass,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { SiFlask } from 'react-icons/si'
import pythonLogo from '../../assets/images/python.svg'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={'Mengenai Skripsi'.split('')}
              idx={10}
            />
          </h1>
          <p>
            Penelitian yang penulis lakukan berjudul{' '}
            <span className="judul-skripsi">
              “Optimasi Algoritma Random Forest Classifier untuk Prediksi
              Employee Turnover Menggunakan SMOTE, Principal Component Analysis,
              dan RandomSearchCV”
            </span>
            .
          </p>
          <p>
            Pada penelitian ini dilakukan optimasi klasifikasi employee turnover
            menggunakan dataset “IBM HR Analytics Employee Attrition &
            Performance”.
          </p>
          <p align="LEFT">
            Dengan integrasi SMOTE, PCA, Random Forest, dan RandomSearchCV
            didapatkan hasil model yang lebih baik dalam memprediksi employee
            turnover dengan meningkatkan keseimbangan kelas, efisiensi
            representasi fitur, dan pemilihan parameter yang optimal.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div div className="face1">
              <SiFlask color="000000" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faSass} color="#CE679A" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face6">
              <img src={pythonLogo} alt="Python Logo" height={210} />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
