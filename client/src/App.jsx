import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./Layout/Layout"

import Login from "./Pages/authentication/login"
import Register from "./Pages/authentication/register"
import Home from './Pages/Home/home'
import Books from './Pages/Books/Books-home'
import Authors from './Pages/Authors/Authors-home'

function App() {


  return (
   
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
        </Route>
       

    </Routes>
    </BrowserRouter>
  )
}

export default App