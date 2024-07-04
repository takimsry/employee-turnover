import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Dataset = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 10000)

    axios
      .get('http://127.0.0.1:5000/dataset')
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Error fetching dataset')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="loadingData">
        <Loader type="pacman" />
      </div>
    )
  }

  if (error) {
    return <div className="errorDataset">{error}</div>
  }

  return (
    <>
      <div className="container dataset-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Dataset'.split('')}
            idx={15}
          />
        </h1>
        <div className="dataset-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Dataset
