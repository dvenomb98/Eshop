import React, { useState} from "react";
import {useNavigate} from "react-router-dom"
import {UserAuth} from "../context/AuthContext"
import { db } from '../firebase';
import { doc, setDoc, runTransaction, updateDoc, arrayUnion, onSnapshot, getDoc} from "firebase/firestore";
import { nanoid } from 'nanoid'


export default function Checkout({cartItems, setCartItems, totalCartPrice, setShowCart}) {
  
    const navigate = useNavigate()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [checkOut, setCheckOut] = useState({
        firstName: "",
        lastName:"",
        address:"",
        country:"",
        phone:"",
        email:""
    })
    

    
    function handleChange(event) {
        const {name, value} = event.target
        setCheckOut(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitLoading(true)

        addHistory()

        setCheckOut({
            firstName: "",
            lastName:"",
            address:"",
            country:"",
            phone:"",
            email:""
        })
        setCartItems([])

        setTimeout(function() {
            navigate("/")
            setSubmitLoading(false)
            
        },2000)
    }

        const today = new Date()
        let day = ("0" + today.getDate()).slice(-2); 
        let month = ("0" + (today.getMonth() + 1)).slice(-2);
        let date = month + '/' + day + '/' + today.getFullYear(); 

      const { user } = UserAuth();
      const addHistory = async () => {


        if(user) {
        const UserID = user.uid
        const ordersRef = doc(db, "orders", UserID)

          try {
              await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(ordersRef);
                if (!sfDoc.exists()) {
                  await setDoc(ordersRef, {
                      orders: [
                          
                          
                      ]})
                }
        
                else {
               
                const currentData = sfDoc.data().orders
                
                transaction.update(ordersRef, {
                  orders: [...currentData,
                      {
                        price: totalCartPrice.toFixed(2),
                        items: cartItems.length,
                        currentDate: date,
                        id: nanoid()
                  }]}
              )}
              });
              console.log("Transaction successfully committed!");
            } catch (e) {
              console.log("Transaction failed: ", e);
            }
        }
      }

    
      const [userInfo, setUserInfo] = React.useState({})
      const [checked, setChecked] = React.useState(false)
    
      React.useEffect(() => {
        if(user) { 
            const getInfo = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);   
                setUserInfo(docSnap.data())
            } 
        getInfo()
        }
      },[])
     

      React.useEffect(() => {
        if(checked === true) {
        setCheckOut({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            address: userInfo.address,
            country: userInfo.country,
            phone: userInfo.phone,
            email: user.email
        })
        }
        else if(checked === false) {
        setCheckOut({
            firstName: "",
            lastName:"",
            address:"",
            country:"",
            phone:"",
            email:""
        })
        }
      },[checked])
    

    return (
        <div className="overflow-y-hidden">
        {!submitLoading ?
            <div className="flex justify-center items-center container mx-auto lg:py-16 md:py-12 py-9 px-5">
                <div className="flex w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                    <div className="flex w-full  flex-col justify-start items-start">
                        <div className>
                            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-neutral-900">Check out</p>
                        </div>
                        <div className="mt-2">
                            <p onClick={() => setShowCart(true)} className="text-base cursor-pointer leading-4 underline  hover:text-neutral-800 text-neutral-600">
                                Back to my cart
                            </p>
                        </div>
                        <div className="mt-12">
                            <p className="text-xl font-semibold leading-5 text-neutral-900">Shipping Details</p>
                        </div>
                        
                        {user && userInfo ?
                        <div className="flex items-center pt-5">
                        <input id="checkbox" type="checkbox" value={checked} onChange={() => setChecked(!checked)} className="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300"/>
                        <label for="checkbox" className="ml-2 text-base font-light text-neutral-900">Use my personal account details</label>
                        </div>
                        : <p className="pt-5 text-gray-500 text-sm">Sign in and/or edit your account details to auto-fill form</p>}

                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                            <input  value={checkOut.firstName} onChange={handleChange} name="firstName" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="First Name" required />
                            <input value={checkOut.lastName} onChange={handleChange} name="lastName" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Last Name" required />
                            <input value={checkOut.address} onChange={handleChange} name="address" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address" required />
                            <input value={checkOut.country} onChange={handleChange} name="country" className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Country" required />
                            <input value={checkOut.phone} onChange={handleChange} name="phone" className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="tel" placeholder="Phone Number" required  />
                            <input value={checkOut.email} onChange={handleChange} name="email" className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="email" placeholder="Email" required  />
                            <button className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-ocus:ring-gray-800 leading-4 py-4 w-full md:w-4/12 lg:w-full text-white bg-indigo-600">Proceed to payment</button>
                        </form>
                        
                        <div className="mt-4 flex justify-start items-center w-full">
                            <p onClick={() => setShowCart(true)} className="cursor-pointer text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                                Back to my cart
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                        <div>
                            <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                        </div>
                        <div className="flex mt-7 flex-col items-end w-full space-y-6">
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Total items</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">{cartItems.length}</p>
                            </div>
                            
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">$10</p>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Sub total</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">${totalCartPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full items-center mt-32">
                            <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                            <p className="text-lg font-semibold leading-4 text-gray-800">${(totalCartPrice + 10).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        : 
        <div className="flex justify-center items-center h-screen" >
            <svg role="status" className=" inline w-16 h-16 mr-2 text-gray-200 animate-spin  fill-neutral-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>}
        </div>
    );
}
