import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Predict from './components/Predict'
import Predikitiw from './components/Predict'
import Layout from './components/Layout'
import Methods from './components/Methods'
import Dataset from './components/Dataset'
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/predikitiw" element={<Predikitiw />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/dataset" element={<Dataset />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
