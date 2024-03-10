import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Join from './pages/Join.jsx'


function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/join' element={<Join />}/>
      </Routes>
    </>
  )
}

export default App
