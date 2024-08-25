import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { productDetail, productsAddToCart ,alertMesg} from '../../atom';

function ProductDetailSideBar() {
  const [productDetails, setproductDetails] = useAtom(productDetail);
  const [updateProduct, setUpdateProduct] = useState({ ...productDetails });
  const [cartProducts, setCartProducts] = useAtom(productsAddToCart);
  const [,setMesg] = useAtom(alertMesg)

  useEffect(() => {
    setUpdateProduct(productDetails);
  }, [productDetails]);

  const handleDecreaseQty = () => {
    if (updateProduct.qty > 1) {
      let qty = updateProduct.qty - 1;
      setUpdateProduct(prevProduct => ({
        ...prevProduct,
        qty: qty,
        price: productDetails.price * qty
      }));
    }
  };

  const handleIncreaseQty = () => {
    let qty = updateProduct.qty + 1;
    setUpdateProduct(prevProduct => ({
      ...prevProduct,
      qty: qty,
      price: productDetails.price * qty
    }));
  };

  const addToCart = () => {
    if (cartProducts.length === 0) {
      setCartProducts([updateProduct]);
    } else {
      const filterProduct = cartProducts.filter(product => product.id === updateProduct.id);
      if (filterProduct.length) {
        const products = cartProducts.map(product => {
          if (product.id === updateProduct.id) {
            let qty = updateProduct.qty + product.qty;
            let price = qty * (updateProduct.price / updateProduct.qty);
            let newProduct = {
              ...product,
              qty,
              price,
            };
            return newProduct;
          } else {
            return product;  // return the existing product if not updated
          }
        });

        setCartProducts(products);

      } else {
        setCartProducts(prev => [...prev, updateProduct]);
      }

      setMesg({message:"Product Added successfully!",success:true})
    }
    setproductDetails({});
  };

  return (
    <div className={`fixed top-0 right-0 bg-transparent text-white h-full w-full ${Object.keys(productDetails).length !== 0 ? "translate-x-0" : "translate-x-full"} transition-all duration-300 ease-in-out`}>
      <div className='bg-black h-full w-full sm:w-2/5 md:w-1/2 lg:w-1/3 absolute right-0'>
        <div className='w-full bg-red-600 h-16 rounded flex justify-between p-3 items-center mt-4'>
          <p className='sm:text-2xl font-medium'>Add To Cart</p>
          <i className={`fa-solid cursor-pointer fa-xmark py-3 sm:text-2xl`} onClick={() => setproductDetails({})}></i>
        </div>
        <div className="body h-4/5 w-full">
          <div className='w-1/2 m-auto cursor-pointer'>
            <img className='object-cover hover:scale-125 transition-all duration-500 ease-in-out' src={updateProduct.image} alt="" />
          </div>
          <div className='p-10 h-3/5 flex flex-col justify-between'>
            <div className='flex justify-between'>
              <h6 className='text-3xl font-bold'>{updateProduct.title}</h6>
              <p className='bg-red-600 p-2 text-xl rounded'>Rs. {updateProduct.price}</p>
            </div>
            <p className='text-sm my-4'>{updateProduct.description}</p>
            <div className='flex justify-evenly'>
              <button className='bg-red-600 px-4 rounded-sm text-3xl' onClick={handleDecreaseQty}>-</button>
              <span className='text-3xl'>{updateProduct.qty}</span>
              <button className='bg-red-600 px-4 rounded-sm text-3xl' onClick={handleIncreaseQty}>+</button>
            </div>
            <button className='bg-green-600 w-[50%] mx-auto my-2 py-1 rounded-md text-2xl hover:bg-green-900 transition-all duration-500 ease-in-out' onClick={addToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSideBar;
