import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
// import { Toaster } from 'react-hot-toast'
import { toast } from "react-hot-toast"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPasword] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        console.log(result)
        if (result.data === 'Successfull') {
          navigate('/home')
          toast.success('Login Successfully')
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="flex h-screen w-screen justify-center items-center ">
      {/* <Toaster/> */}
      <div className="">
        <h1 className='text-center text-xl'>Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <input type="text" placeholder="Email"
            required
            name='email'
            className="border-2 rounded-lg p-2 outline-none mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input type="text" placeholder="Password"
            required
            name='password'
            className="border-2 rounded-lg p-2 outline-none"
            onChange={(e) => setPasword(e.target.value)}

          />

          <button
            className='bg-purple-600 py-3 rounded-md text-white font-bold p-20'
          >Register</button>
        </form>
        <p className="mt-1">Already Have an Account </p>
        <div className="bg-green-600 text-center p-2 rounded-md text-white text-xl cursor-pointer
        hover:bg-red-700
        ">
          <Link to="/">Register</Link>
        </div>
      </div>

    </div>
  )
}

export default Login