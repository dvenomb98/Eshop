import React from 'react'
import { useParams } from 'react-router-dom'

function SingleProduct({products, addToCart}) {

    const { productName } = useParams()





  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-5 py-10">
  {products.filter(prod => prod.id === productName).map(product => (

      <div  key={product.name} className="flex flex-col gap-5 lg:flex-row sm:items-center lg:gap-10"> 
        <img src={product.img} className="md:w-1/2 h-full" />
        <div className="flex flex-col gap-5">

            <h3 className="text-xl font-semibold uppercase">{product.name}</h3>
            <p className="font-light text-gray-500 ">{product.description}</p>

            <div className="flex flex-col gap-5 md:flex-row md:justify-between ">
            <div className="flex justify-between items-center md:gap-5">
              <p className="text-xl font-semibold">{product.price} $</p>
              <p className={`text-xl font-light ${product.stock ? "text-green-600" : "text-red-600"}`}>{product.stock ? "Available" : "Out of stock"}</p>
            </div>
            <button onClick={() => addToCart(product)} className="rounded-sm border border-transparent bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700">Add to cart</button>
            </div>

            
        </div>
      
      
      </div>
    
  ))}
    
    </div>
</div>
  )

}

export default SingleProduct