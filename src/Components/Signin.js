import React from 'react'
import {useNavigate, Link} from "react-router-dom"
import {UserAuth} from "../context/AuthContext"


function Signin() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const navigate = useNavigate()
    const { signIn } = UserAuth()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('')
      try {
        await signIn(email, password)
        navigate("/")
      } catch (e) {
        setError(e.message)
        console.log(e.message)
      }
    };
    
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-center">
          
          <div className="bg-white p-5 px-10 rounded-sm md:w-1/2 lg:w-1/3 shadow-xl shadow-black/50 border border-transparent">
  
             
          <h1 className="font-bold text-xl text-center">Sign in to your account</h1>
            
  
            {error && <p className="bg-red-600 text-center text-white p-1 my-2 rounded-sm">{error}</p>}
  
            <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-2">
  
              <div className="flex flex-col gap-2">
                <label className="font-medium">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-sm" type="email" />
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="font-medium">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-sm" type="password" />
              </div>
  
            <button className="bg-indigo-600 text-white rounded-sm py-2 mt-5">Sign in</button>
            <p className="mt-2">Dont have account yet?<Link className="pl-2 font-bold" to="/signup">Sign up</Link></p>
            
            
            </form>
          
          </div>
          </div>
      </div>
    )
  
}

export default Signin