import React from 'react'
import { useAtom } from 'jotai';
import { productDetail } from '../../atom';
function KfcCard({product}) {

  const [,setAddToCart] = useAtom(productDetail);
  return (
    <div className='lg:w-1/5 md:w-1/4 sm:w-1/3   bg-gray-800 rounded-lg flex flex-col justify-center items-center p-5'>
    <div className='w-3/4'>
    <img className='object-cover w-2/3 sm:w-full' src={product.image} alt="Product Image" />
    </div>
    <div>
    <h1 className='text-2xl'>{product.title}</h1>
    <p className='text-slate-200 my-4'>{product.description.length>50?product.description.slice(0,50)+"....":product.description}</p>
    <p className='bg-red-500 p-2 rounded-md inline-block'>Rs :{product.price}</p>
    
      <button className='p-2 mt-4 block bg-red-600  rounded font-medium hover:bg-red-500 text-sm transition-all duration-200 ease-in-out text-white' onClick={_=>{setAddToCart({...product,qty:1})}}>Add to cart</button>
  
    </div>

    </div>
  )
}

export default KfcCard