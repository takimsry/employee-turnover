import './index.scss'
import { useState } from 'react'
import LogoS from '../../assets/images/logo-s.png'
// import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  // faEnvelope,
  faBars,
  faClose,
  faGlobe,
  faCode,
  faDatabase,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="nav-bar">
      <Link className="logo" to="/" onClick={() => setShowNav(false)}>
        <img src={LogoS} alt="Logo" />
        {/* <img className="sub-logo" src={LogoSubtitle} alt="slobodan" /> */}
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="methods-link"
          to="/methods"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faCode} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="dataset-link"
          to="/dataset"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faDatabase} color="#4d4d4e" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="predict-link"
          to="/predict"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassChart} color="#4d4d4e" />
        </NavLink>
        <FontAwesomeIcon
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className="close-icon"
        />
      </nav>
      <ul>
        <li>
          <a
            href="https://takimsurya.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGlobe}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        {/* <li>
          <a
            href="mailto:muhammadmustakimsurya@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li> */}
        <li>
          <a
            href="https://www.linkedin.com/in/m-mustakim-surya/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/m-mustakim-surya"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon
        onClick={() => setShowNav(true)}
        icon={faBars}
        color="#ffd700"
        size="3x"
        className="hamburger-icon"
      />
    </div>
  )
}

export default Sidebar
