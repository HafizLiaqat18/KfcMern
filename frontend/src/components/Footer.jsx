import React from 'react';

function Footer() {
  return (
    <div className=' mt-28 px-12'>
      <div>
        <div className='bg-red-500 flex text-sm justify-between px-5 py-2 md:text-xl rounded-md'>
          <p>Get connected with us on social networks:</p>
          <div className=' text-sm w-1/2 cursor-pointer flex justify-evenly items-center md:w-1/5'>
            <i className="fa-brands cursor-pointer fa-facebook"></i>
            <i className="fa-brands cursor-pointer fa-twitter"></i>
            <i className="fa-brands cursor-pointer fa-google"></i>
            <i className="fa-brands cursor-pointer fa-instagram"></i>
            <i className="fa-brands cursor-pointer fa-linkedin"></i>
            <i className="fa-brands cursor-pointer fa-github"></i>
          </div>
        </div>
        <div className='flex flex-col justify-between md:justify-evenly sm:flex-row item-center flex-wrap'>
          <div className='my-10 sm:w-1/2 md:w-1/4'>
            <h6 className='text-2xl text-red-500 text-center'>Company Name</h6>
            <div className='text-center w-40 bg-gray-400  h-[2px] m-auto'></div>
            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
          <div className='mb-10 sm:mt-10'>
            <h6 className='text-2xl text-red-500 text-center'>Products</h6>
            <div className='text-center w-40 bg-gray-400  h-[2px] m-auto'></div>
            <ul className='text-center h-32 flex flex-col justify-between  mt-5'>
              <li><a href="/">EveryDay</a></li>
              <li><a href="/">Burger's</a></li>
              <li><a href="/">Family Deal</a></li>
              <li><a href="/">Fastivel Deals</a></li>
            </ul>
          </div>
          <div className='mb-10 sm:mt-10'>
            <h6 className='text-2xl text-red-500 text-center'>Useful links</h6>
            <div className='text-center w-40 bg-gray-400  h-[2px] m-auto'></div>
            <ul className='text-center h-32 flex flex-col justify-between  mt-5'>
              <li><a href="/">Your Account</a></li>
              <li><a href="/">Become an Affiliate</a></li>
              <li><a href="/">Shipping Rates</a></li>
              <li><a href="/">Help</a></li>
            </ul>
          </div>
          <div className='mb-10 sm:mt-10'>
            <h6 className='text-2xl text-red-500 text-center'>Contact</h6>
            <div className='text-center w-40 bg-gray-400  h-[2px] m-auto'></div>
            <ul className='text-center h-32 flex flex-col justify-between  mt-5'>
              <li><a href="/"><i className="fa-solid fa-house"></i> Lahore ,Pakistan</a></li>
              <li><a href="/"><i className="fa-regular fa-envelope"></i> info@example.com</a></li>
              <li><a href="/"><i className="fa-solid fa-tty"></i>+92 3202790970</a></li>
              <li><a href="/"><i className="fa-solid fa-phone"></i> +923414637931</a></li>
            </ul>
          </div>
        </div>
        <div className='bg-[#212529] text-center'>
          <p>© 2020 Copyright: <a href="/" className='text-red-500'>KFC.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
