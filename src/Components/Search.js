import { ArrowNarrowRightIcon, ChevronRightIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'

function Search({categories, setSearchTerm, count, setCount}) {

    


  return (
    <div className="">

        <div className="container mx-auto px-5 py-5 flex flex-col items-start lg:items-center gap-5 lg:flex-row-reverse lg:justify-between">

            <div className="flex gap-2 flex-row-reverse ">
                <SearchIcon className="w-5" />
                <input onChange={(event) => setSearchTerm(event.target.value)} className="py-1 px-3 border-b border-neutral-900 rounded-sm placeholder-neutral-900" type="text" placeholder="Search products" />
            </div>

            <div className=" grid grid-cols-2 w-full sm:flex gap-5 items-center justify-start sm:flex-wrap">
                    <div onClick={() => setSearchTerm("")} className="flex gap-1 hover:text-indigo-600 cursor-pointer transition ease-in  p-4 bg-zinc-100 rounded-md sm:w-40 items-center justify-center ">
                        <p  className="md:text-lg">All</p>
                        <ChevronRightIcon className="w-3 md:w-5" />
                    </div>
                {categories.map((cat) => (
                    <div key={cat} onClick={() => setSearchTerm(cat)} className="flex gap-1 hover:text-indigo-600 cursor-pointer transition ease-in p-4 bg-zinc-100 rounded-md sm:w-40  items-center justify-center">
                        <p className="md:text-lg">{cat}</p>
                        <ChevronRightIcon className="w-3 md:w-5" />
                    </div>
                ))}
            </div>
        
        </div>
    </div>
  )
}

export default Search