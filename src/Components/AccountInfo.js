import React from 'react'
import {UserAuth} from "../context/AuthContext"
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';


function AccountInfo() {

  const { user } = UserAuth();
  const UserID = user.uid

  const [checkOut, setCheckOut] = React.useState({
    firstName: "",
    lastName:"",
    address:"",
    country:"",
    phone:"",
  })

  function handleChange(event) {
    const {name, value} = event.target
    setCheckOut(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })

    console.log(checkOut)
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await setDoc(doc(db, "users", UserID), {
      firstName: checkOut.firstName,
      lastName: checkOut.lastName,
      address: checkOut.address,
      country: checkOut.country,
      phone: checkOut.phone,
      email: user.email
      
    });
    setCheckOut({
    firstName: "",
    lastName:"",
    address:"",
    country:"",
    phone:"",
    })
    
    
  }



  return (
    <div className="container mx-auto px-5 pb-10">
      <div className="mt-12">
        <p className="text-xl font-semibold leading-5 text-neutral-900">Edit your personal informations</p>
      </div>
      <form onSubmit={handleSubmit}  className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
         <input value={checkOut.firstName} onChange={handleChange} name="firstName" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Name" required />
         <input value={checkOut.lastName} onChange={handleChange} name="lastName" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Surname" required />
         <input value={checkOut.address} onChange={handleChange} name="address" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address" required />
         <input value={checkOut.country} onChange={handleChange} name="country" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Country" required />
         <input value={checkOut.phone} onChange={handleChange} name="phone" className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="number" placeholder="Phone Number" required  />
         <button className="mt-8 text-base font-medium leading-4 py-4 w-full md:w-1/4 text-white bg-indigo-600">SAVE</button>
       </form> 
    
    
    
    </div>
  )
}

export default AccountInfo