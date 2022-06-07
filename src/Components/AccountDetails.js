import React from 'react'
import {UserAuth} from "../context/AuthContext"
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

function AccountDetails() {
  
  const [userInfo, setUserInfo] = React.useState({})
  const { user } = UserAuth()

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserInfo(doc.data());
    });

  },[])

  

  
  return (
    <div className="container mx-auto px-5 pb-10">

      <div className="mt-12">
          <p className="text-xl font-semibold leading-5 text-neutral-900">Account details</p>
      </div>

      <div>
  
        <div className="flex gap-5 border-b py-4 text-base leading-8">
          <p className="basis-1/6 font-semibold">Name: </p>
          <p>{userInfo?.firstName}</p>
        </div>

        <div className="flex gap-5 border-b py-4 text-base leading-8">
          <p className="basis-1/6 font-semibold">Surname: </p>
          <p>{userInfo?.lastName}</p>
        </div>

        <div className="flex gap-5 border-b py-4 text-base leading-8">
          <p className="basis-1/6 font-semibold">Email: </p>
          <p>{user.email}</p>
        </div>

        <div className="flex gap-5 border-b py-4 text-base leading-8">
          <p className="basis-1/6 font-semibold">Country: </p>
          <p>{userInfo?.country}</p>
        </div>

        <div className="flex gap-5 border-b py-4 text-base leading-8">
          <p className="basis-1/6 font-semibold">Address: </p>
          <p>{userInfo?.address}</p>
        </div>

        <div className="flex gap-5 border-b py-4 text-base leading-8"> 
          <p className="basis-1/6 font-semibold">Phone: </p>
          <p>{userInfo?.phone}</p>
        </div>

      </div>
    
    </div>
  )
}

export default AccountDetails
