import React, { useState } from 'react';
import { getApi } from '../apis';
import {useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { OffCanvasValue,productsAddToCart , alertMesg} from '../../atom';

function Header() {
const [products] = useAtom(productsAddToCart)
 const [,setOffCanvas] = useAtom(OffCanvasValue);
 const [,setMesg]= useAtom(alertMesg)
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {

      await getApi('logout'); 
      document.cookie = "token=; max-age=0; path=/";  
      navigate("/"); 
      setMesg({message:"Logout SuccessFully " , success:true}) 
      
  } catch (error) {
    setMesg({ success: false, message: error.message === "Request failed with status code 404" ? "Invalid Email and Password" : error.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : error.message });
  }
  };

async function adminLogin (){
  try {

    await getApi('logout'); 
    document.cookie = "token=; max-age=0; path=/";  
    navigate("/admin/login"); 
    setMesg({message:"Move to Admin Panel SuccessFully " , success:true}) 
    
} catch (error) {
  setMesg({ success: false, message: error.message === "Request failed with status code 404" ? "Invalid Email and Password" : error.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : error.message });
}
 
}
  return (
    <header className='w-full text-xl sticky top-0 left-0 bg-black text-white'>
      <nav className=' w-full pt-4'>
       
              <div className=' flex justify-between items-center  px-10'>

                <div className='flex w-2/5 justify-between  items-center h-16'>
                  {/* <img className=' w-16' src={image} alt="" /> */}
                  <h1 className=' text-red-500 text-4xl'>KFC</h1>
                  <div className='hidden md:flex w-full justify-around pr-14 pl-5'>
                    <button className='border-2 border-red-700 p-2 uppercase'>Delivery</button>
                    <button className='ml-3 uppercase'> PickUp</button>
                  </div>
                </div>
                <div className='hidden md:flex justify-between w-1/2'>
                {/* <div className='w-1/2'>

                  <input placeholder='Search' className='text-black w-10/12  px-2  border-2 focus:border-red-600 outline-none rounded' type="text" value={searchValue} onChange={(e) => { console.log(e.target.value); setSearchValue(e.target.value) }} />
                  <i  className="bg-red-600 fa-solid px-3 cursor-pointer py-2 rounded-md fa-magnifying-glass"></i>
                </div> */}
                <div className=' w-full flex justify-end gap-5'>

                  <button className='bg-red-600 border rounded-lg border-none p-1 uppercase hover:bg-red-500 transition-all duration-300 ease-in-out text-white' onClick={handleLogout}>Login</button>
                  <button className='bg-red-600 border rounded-lg border-none p-1 uppercase hover:bg-red-500 transition-all duration-300 ease-in-out text-white' onClick={adminLogin}>Admin Panel</button>
                  <button className='bg-blue-600 border rounded-lg border-none p-1 uppercase hover:bg-blue-900 transition-all duration-300 ease-in-out text-white mx-5' onClick={handleLogout}>Logout</button>
                  <i onClick={_=>setOffCanvas(true)} className="ml-7 fa-solid cursor-pointer fa-cart-shopping bg-red-600 border rounded-lg border-none p-3 hover:bg-red-500 transition-all duration-300 ease-in-out text-white" ><span className='px-1'>{products.length}</span></i>

                </div>

                </div>
                <i
                  className={`fa-solid cursor-pointer md:hidden ${true ? 'hidden' : 'inline'} fa-bars`}
                  
                ></i>
              </div>
          
      </nav>
    </header>
  );
}

export default Header;
