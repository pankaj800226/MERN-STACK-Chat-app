import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from 'react-hot-toast'

import Header from './Header'
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Toaster/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App