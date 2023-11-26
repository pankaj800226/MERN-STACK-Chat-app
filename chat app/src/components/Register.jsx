import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPasword] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signup', { name, email, password })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <div className="flex h-screen w-screen justify-center items-center">
                <div className="">
                    <h1 className="text-center text-xl">Register</h1>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username"
                            required
                            name="name"
                            className="border-2 rounded-lg p-2 outline-none mt-2"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input type="text" placeholder="Email"
                            required
                            name="email"
                            className="border-2 rounded-lg p-2 outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input type="text" placeholder="Password"
                            required
                            name="password"
                            className="border-2 rounded-lg p-2 outline-none"
                            onChange={(e) => setPasword(e.target.value)}
                        />
                        <button
                            className='bg-purple-600 py-3 rounded-md text-white font-bold p-20'

                        >Register</button>
                    </form>
                    <p className="mt-1 text-center">Already Have an Account </p>
                    <div className="bg-green-600 text-center cursor-pointer p-2 rounded-md text-white text-xl mt-2 hover:bg-red-700">
                        <Link to="/login">Login</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register