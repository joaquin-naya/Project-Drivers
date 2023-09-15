import { Route, Routes, useLocation } from 'react-router-dom'
import { Home, Detail, Form, Landing } from "./views/views"
import { NavBar } from "./components/components"
import './App.css'

function App() {
  return (
    <>
      {useLocation().pathname !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App
