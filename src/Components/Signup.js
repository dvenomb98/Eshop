import React from 'react'
import {useNavigate, Link} from "react-router-dom"
import {UserAuth} from "../context/AuthContext"
import {addDoc, collection, setDoc, doc } from "firebase/firestore"
import { db } from '../firebase';


function Signin() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [repPassword, setRepPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [success, setSucess] = React.useState("")
    const navigate = useNavigate()
    const { createUser} = UserAuth()
    
   

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('')
      setSucess("")
      if (password === repPassword)
    {
      try {
        await createUser(email, password)
        setSucess("Your account was sucessfully created!")
        setTimeout(function() {
          navigate("/signIn")},3000)
      } catch (e) {
        setError(e.message)
        console.log(e.message)
      }
      }
      else {setError("Passwords doesnt match")}
    };



    
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-center py-10">
          
          <div className="bg-white p-5 px-10 rounded-sm md:w-1/2 lg:w-1/3 shadow-xl shadow-black/50 border border-transparent">
  
            
             
          <h1 className="font-bold text-xl text-center">Create your account</h1>
            
  
            {error && <p className="bg-red-600 text-center text-white p-1 my-2 rounded-sm">{error}</p>}
            {success && <p className="bg-green-600 text-center text-white p-2 my-2 rounded-sm">{success}</p>}
  
            <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-2">

              <div className="flex flex-col gap-2">
                <label className="font-medium">Name</label>
                <input onChange={(e) => setName(e.target.value)} className="border p-2 rounded-sm" type="text" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Surname</label>
                <input onChange={(e) => setLastName(e.target.value)} className="border p-2 rounded-sm" type="text" required  />
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="font-medium">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-sm" type="email" required  />
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="font-medium">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded-sm" type="password" required  />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Repeat password</label>
                <input onChange={(e) => setRepPassword(e.target.value)} className="border p-2 rounded-sm" type="password" required  />
              </div>
  
            <button className="bg-indigo-600 text-white rounded-sm py-2 mt-5">Sign up</button>
            <p className="mt-2">Already have account?<Link to="/signin" className="pl-2 font-bold">Sign in</Link></p>
            
            
            </form>
          
          </div>
          </div>
      </div>
    )
  
}

export default Signin