import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import { WebSocketProvider } from './hooks/socketProvider.jsx'
import Home from './pages/Home.jsx'
import Join from './pages/Join.jsx'


function App() {
  
  return (
    <>
    <WebSocketProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/join' element={<Join />}/>
      </Routes>
      </WebSocketProvider>
    </>
  )
}

export default App
