import React from 'react'
import {HeartIcon, HomeIcon, LibraryIcon, LoginIcon, LogoutIcon, MailIcon, MenuIcon, ShoppingCartIcon, UserIcon} from "@heroicons/react/outline"
import {Link, useNavigate} from "react-router-dom"
import { UserAuth } from "../context/AuthContext"


function Navbar({cartItems, setShowCart}) {

  const { user, logout } = UserAuth();
  const navigate = useNavigate()
 
  const [isOpened, setIsOpened] = React.useState(false)

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };



  return (
    <div className="container mx-auto px-5 h-16 flex justify-center items-center z-50 sticky top-0 bg-white">

        <div className="flex justify-between w-full items-center">
            <Link  className="flex justify-center items-center" to="/"><h1 className="font-bold text-indigo-600">PERFORMANCE<span className="font-light pl-1 text-sm text-gray-500">MARKET</span></h1></Link>
            <div className="flex flex-row-reverse gap-10 sm:hidden">
              <MenuIcon onClick={() => setIsOpened(prevState => !prevState)} className="w-5 cursor-pointer" />
              <div  onClick={() => setShowCart(prevState=> !prevState)} className="cursor-pointer relative flex flex-col items-center justify-center" to ="/cart"><ShoppingCartIcon className="w-5" /><p className="absolute top-2 left-3 bg-indigo-600 text-white px-[3px] rounded-full font-light">{cartItems.length > 0 && cartItems.length}</p></div>
            </div>
            <nav className="hidden sm:block">
              <ul className="flex uppercase gap-10 text-sm">
                <Link className="flex justify-center flex-col items-center" to ="/"><HomeIcon className="w-5" /><li className="px-2 cursor-pointer">Home</li></Link>
                {user ? <Link className="flex flex-col items-center justify-center" to ="/account/details"><UserIcon  className="w-5" /><li className="cursor-pointer">Account</li></Link> : "" }
                {user ? <div  onClick={handleLogout} className="cursor-pointer flex flex-col items-center justify-center"><LogoutIcon className="w-5" /><li className=" font-semibold" >Logout</li></div> : <Link className="flex flex-col items-center justify-center" to="/signin"><UserIcon className="w-5" /><li className="cursor-pointer">Sign in</li></Link>}
                <div  onClick={() => setShowCart(prevState=> !prevState)} className=" cursor-pointer flex flex-col items-center justify-center relative" ><ShoppingCartIcon className="w-5" /><li className="cursor-pointer">Cart</li><p className="absolute top-1 left-6 bg-indigo-600 text-white px-[3px] rounded-full font-light">{cartItems.length > 0 && cartItems.length}</p></div>
              </ul>
            </nav>

            <nav className={`${isOpened ? "translate-x-0" : "translate-x-full"} fixed top-0 sm:hidden h-full right-0 w-1/2 bg-gradient-to-r from-white to bg-slate-100 z-50`}>
              <ul className="flex flex-col mt-20 uppercase gap-10 items-start ml-7 text-sm">
                <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/"><HomeIcon className="w-5" /><li className="px-2 cursor-pointer">Home</li></Link>
                {user ? <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/account/details"><UserIcon  className="w-5" /><li className="cursor-pointer px-2">Account</li></Link> : "" }
                <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to ="/contact"><MailIcon className="w-5" /><li className="px-2 cursor-pointer">Contact</li></Link>
                {user ? <div onClick={() => logout()} className="flex hover:text-black hover:font-bold transition ease-in-out"><LogoutIcon className="w-5" /><li className="cursor-pointer pl-2 font-semibold">Logout</li></div> : <Link className="flex hover:text-black hover:font-bold transition ease-in-out" to="/signin"><UserIcon className="w-5" /><li className="cursor-pointer pl-2 font-semibold">Sign in</li></Link>}
              </ul>
              <button onClick={() => setIsOpened(prevState => !prevState)} className="absolute top-2 left-5 text-xl p-2">X</button>
            </nav>


        </div>

    </div>
  )
}

export default Navbar