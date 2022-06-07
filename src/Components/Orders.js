import React from 'react'
import {UserAuth} from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

function Orders() {

  const [ordersInfo, setOrdersInfo] = React.useState([])
  const { user } = UserAuth()

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "orders", user.uid), (doc) => {
      setOrdersInfo(doc.data());
    });

  },[])

  return (
    <div className="container mx-auto px-5 pb-10 text-base">
      <div className="mt-12 mb-5">
        <p className="text-xl font-semibold leading-5 text-neutral-900">Your order history</p>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
      {!ordersInfo ? 
      <p className="text-red-600">You dont have any orders yet!</p>
      :
        ordersInfo?.orders?.map(order => (
          <div key={order.id} className="flex flex-col bg-zinc-100 rounded-md p-2">
          <p><span className="text-lg font-semibold ">Order ID:</span> {order.id}</p>
          <p><span className="text-lg font-semibold ">Number of items:</span> {order.items}</p>
          <p><span className="text-lg font-semibold ">Date:</span> {order.currentDate}</p>
          <p><span className="text-lg font-semibold ">Price: </span> {order.price} $</p>
        </div>

        ))}
      
      </div>




    </div>


  )
}

export default Orders