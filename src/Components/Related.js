import React from 'react'
import { Link } from 'react-router-dom';


function Related({products}) {

    const [count, setCount] = React.useState(8)


    
  return (
    <div className="bg-zinc-50">
        <div className="container mx-auto px-5 flex flex-col items-center pb-5">

            <h3 className="text-2xl py-10 md:text-4xl self-start">Customers also buy:</h3>
        
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-10">
            {products.sort( () => .5 - Math.random() ).slice(0,4).map(product => (
                <Link to={`/${product.id}`} key={product.name} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 rounded-sm bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price} $</p>
                </Link>
            ))}
            </div>

        </div>
    </div>
  )
}

export default Related