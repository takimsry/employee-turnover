import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className="staffx">
              <span className={`${letterClass} _13`}>StaffX</span>
            </span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={' : Employee'.split('')}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={'Turnover Prediction'.split('')}
              idx={15}
            />
          </h1>
          <h2>M. Mustakim Surya / TI '20 / 4611420041</h2>
          <Link to="/predict" className="flat-button">
            GO PREDICT
          </Link>
        </div>
        <Logo />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
