import React from 'react'
import { Link } from 'react-router-dom';


function Products({products, searchTerm, count, setCount}) {



  return (
    <div id="products" className="bg-zinc-50 min-h-screen">
        <div className="container mx-auto px-5 flex flex-col items-center pb-5">

            <h3 className="text-2xl py-10 md:text-4xl self-start">{searchTerm ? searchTerm : "Products"}</h3>
        
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-10">
            {products.filter((prod)=> {
               
                if (searchTerm == "") {
                    return prod     
                }
                else if (prod.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return prod
                }

                else if (prod.category === searchTerm) {
                    return prod
                }
     
            }).slice(0,count).map(product => (
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

            <button className="flex rounded-sm border border-transparent bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700" onClick={() => setCount(prevState => prevState + 8)}>Load more</button>
        </div>
    </div>
  )
}

export default Products