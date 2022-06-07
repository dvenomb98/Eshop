import React from "react"
import Link from "react-scroll/modules/components/Link";



export default function index() {


    return (
        <div>
            <div className="container mx-auto px-5 md:pb-5 pb-9">
                <div className="relative rounded-md">
                    <img src="https://i.ibb.co/JK2B8BR/i-Stock-1046533046-1.jpg" alt="city view" className="w-full h-full rounded-sm  object-center object-cover absolute sm:block hidden" />
                    <img src="https://i.ibb.co/JK2B8BR/i-Stock-1046533046-1.jpg" alt="city view" className="w-full h-full rounded-sm absolute object-center object-cover sm:hidden" />
                    <div className="text-xl relative z-5 bg-gradient-to-r from-gray-900 to-transparent w-full h-full top-0 md:p-16 p-6 flex flex-col justify-between rounded-sm ">
                        <div>
                            <h1 className="md:text-5xl text-3xl font-bold md:leading-10 leading-9 text-white sm:w-auto w-64">Best world wide supplements</h1>
                            <p className="text-lg leading-6 text-white xl:w-5/12 lg:w-8/12 md:w-10/12  2xl:pr-12 mt-4">Lollipop fruitcake oat cake jelly donut cupcake.Tiramisu halvah topping brownie macaroon cupcake cookie. Muffin halvah carrot cake lemon drops dragée gingerbread. </p>
                        </div>
                        <Link 
                        to="products"
                        spy={true}
                        smooth={true}
                        hashSpy={true}
                        offset={0}
                        duration={500}
                        isDynamic={true}
                        className="md:mt-12 mt-20">
                            <button className="text-base font-medium leading-4 text-neutral-900 bg-white sm:w-auto w-full rounded p-4 ">Start exploring</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}