import React from 'react'

function ProductShimmerEffect() {
  return (
    <div className='lg:w-1/5 h-[350px] md:w-1/4 bg-gray-800 rounded-lg flex flex-col justify-center items-center p-5'>
    <div className='w-3/4  h-[100%] '>
    </div>
    <div className='w-full h-full'>
    <h1 className=' bg-gray-500 w-3/4 h-5 rounded-md'></h1>
    <p className='bg-gray-500 w-full h-5 rounded-md my-4'></p>
    <p className=' bg-gray-500 w-14 p-2 rounded-md inline-block'></p>
    
      <button className='bg-gray-500 w-16 p-2 rounded-md block mt-4'></button>
  
    </div>

    </div>
  )
}

export default ProductShimmerEffect