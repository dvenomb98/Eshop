import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React from "react"
import { Link } from 'react-router-dom'

function Cart({showCart, setShowCart, cartItems, setCartItems, totalCartPrice, removeFromCart}) {

    function addQuantity(id) {
        setCartItems(prevState => prevState.map(item => item.id === id
        ? { ...item, qnt: item.qnt + 1 }
        : item
        ))
       
      }

    function removeQuantity(id) {
        setCartItems(prevState => prevState.map(item => item.id === id
        ? { ...item, qnt: item.qnt - 1 }
        : item
        ))
      }

     

    
    
    return (
        <Transition.Root show={showCart} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className=" text-neutral-900"> Shopping cart </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setShowCart(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems?.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.img}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="font-light">
                                        {product.name}
                                      </h3>
                                      <p className="ml-4">{(product.price * product.qnt).toFixed(2)}$</p>
                                    </div>
                                   
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    
                                  <div className="flex items-center gap-2 justify-center">
                                    <p onClick={() => addQuantity(product.id)} className="font-semibold text-2xl px-2 cursor-pointer" >+</p>
                                    <p className="font-bold text-xl border px-2 border-neutral-900 rounded-sm">{product.qnt}</p>
                                    <p onClick={() => product.qnt > 1 && removeQuantity(product.id)}className="font-semibold text-2xl px-2 cursor-pointer">-</p>
                                  
                                  
                                  </div>

                                    <div className="flex">
                                      <button
                                        onClick={() => removeFromCart(product.id)}
                                        type="button"
                                        className="font-medium  text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalCartPrice.toFixed(2)}$</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 font-light">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                      {cartItems.length> 0 ?
                        <Link
                          to="/checkout"
                          onClick={() => setShowCart(false)}
                          className="flex items-center justify-center rounded-sm border border-transparent bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                        :
                        ""
                      }
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
        
    );
}

export default Cart;
