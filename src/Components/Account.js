import { UserCircleIcon, TicketIcon, InformationCircleIcon, CogIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

function Account() {
  return (
    <div className="container mx-auto px-5 lg:flex lg:flex-col items-start py-5">

        <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-neutral-900 pb-5 lg:pb-10">Account</p>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:w-full">
            <Link to ="/account/details" className="flex gap-3 bg-zinc-100 p-3 rounded-md lg:w-56 cursor-pointer">
                <UserCircleIcon className="w-5" />
                <p>Account details</p>
            </Link>

            <Link to="/account/orders" className="flex gap-3 bg-zinc-100 p-3 rounded-md lg:w-56 cursor-pointer">
                <TicketIcon className="w-5" />
                <p>Order history</p>
            </Link>

            <Link to="/account/edit" className="flex gap-3 bg-zinc-100 p-3 rounded-md lg:w-56 cursor-pointer">
                <CogIcon className="w-5" />
                <p>Edit informations</p>
            </Link>
        
        </div>
    
    </div>
  )
}

export default Account