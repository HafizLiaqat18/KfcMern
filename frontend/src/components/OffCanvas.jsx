import React, { useEffect, useState } from 'react';
import EmptyProductList from './EmptyProductList';
import { useAtom } from 'jotai';
import {productsAddToCart,OffCanvasValue,alertMesg} from "../../atom";

function OffCanvas() {
  
const [products ,setProducts] = useAtom(productsAddToCart);
const [OffCanvasBtn,setOffCanvas] = useAtom(OffCanvasValue);
const [,setMesg] = useAtom(alertMesg)
const [totalPrice,setTotalPrice] = useState(0);
  
 useEffect(()=>{
  updatePrice(products)
 },[products])

  function updatePrice (array){
    let temp = array.reduce((acc,curr)=>acc+curr.price,0);
    setTotalPrice(temp);
  }
  
  function handleIncreaseQty(item) {
    let updateProducts = products.map((product) => {
      if (product.id === item.id) {
        let newQty = item.qty + 1;
        let newPrice = (item.price/item.qty)*newQty;
        let newProduct = {
          ...item,
          qty: newQty,
          price: newPrice
        }
        return newProduct;
      }
      else {
        return product;
      }
    })
    setProducts(updateProducts);
    updatePrice(updateProducts);
    
    
  }
  
  function handleDecreaseQty(item) {
    let updateProducts = products.map((product) => {
      if (product.id === item.id) {
        let newQty = item.qty===1?item.qty:item.qty - 1;
        let newPrice = (item.price/item.qty) * newQty;
        let newProduct = {
          ...item,
          qty: newQty,
          price: newPrice
        }
        return newProduct;
      }
      else {
        return product;
      }
    })
    setProducts(updateProducts);
    updatePrice(updateProducts);
  }
  
  function confirmOrder(){
    setTotalItems(0);
    offCanvasBtn();
    setProducts([]);
    setPopupText("Thanks for order :)");
  
  }
  function deleteItem(item) {
    let updateProducts = products.filter((product) => product.id !== item.id);
    setProducts(updateProducts);
    updatePrice(updateProducts);
    setTotalItems(updateProducts.length)
  setMesg({message:"Delete Item From Cart ",success:true})
    
  }
  

  function confirmOrder(){
setOffCanvas(false)
setProducts([]);
setTotalPrice(0);
setMesg({message:"Order Placed Successfully !",success:true})

  }
  return (
    <div className={`fixed top-0 z-40 right-0  bg-transparent h-full text-white w-full ${!OffCanvasBtn&&"translate-x-full"} transition-all duration-300 ease-in-out `}>
      <div className=' h-full w-full sm:w-2/5 md:w-1/3 absolute bg-black right-0'>

        <div className='w-full text-white bg-red-600 h-16 rounded flex justify-between items-center mt-4 p-3 '>
          <p className=' sm:text-2xl font-medium '>Item Added {products.length}</p>
          <i className={`fa-solid cursor-pointer fa-xmark py-3 sm:text-2xl`}  onClick={_=>setOffCanvas(false)}></i>
        </div>

        {
          !products.length?<EmptyProductList text="You haven’t added any items in bucket yet"/>:
          (
        <div className="h-full w-full" >
          <div className='w-full h-[50%] p-4 overflow-auto'>
            {products.map((product) => {
              return (
                <div key={product.id} className='w-full  flex items-center justify-between'>
                  <img className='w-[13%]' src={product.image} alt="" />
                  <div className='flex items-center justify-around w-full mx-4'>
                    <p className='text-sm w-28'>{product.title.length>10? (product.title.slice(0,10) + "..."):product.title}</p>
                   
                    <button className='bg-red-600 px-4 rounded-sm text-xl' onClick={_ => handleDecreaseQty(product)}>-</button>
                    <p className='text-xl'>{product.qty}</p>
                    <button className='bg-green-600 px-4 rounded-sm text-xl' onClick={_ => handleIncreaseQty(product)}>+</button>
                    <i className="fa-solid cursor-pointer text-red-600 fa-trash text-xl" onClick={_ => deleteItem(product)}></i>
                   
                  </div>
                </div>
              )
            })}


          </div>
          <div className='p-3 rounded-lg w-full h-[38%] bg-red-600 flex flex-col justify-between'>
            <div className='flex justify-between text-xl font-bold'>
              <p>SubTotal</p>
              <p>Rs {totalPrice}</p>
            </div>
            <div className='flex justify-between text-xl font-bold'>
              <p>Tax (17%)</p>
              <p>{Math.floor(totalPrice*0.17)}</p>
            </div>
            <div className='flex justify-between text-xl font-bold'>
              <p>Delivery Fee</p>
              <p>To Be Calculated</p>
            </div>
            <div className='flex justify-between text-xl font-bold' >
              <p>Total</p>
              <p>Rs: {Math.floor(totalPrice*1.17)}</p>
            </div>
            <button className='bg-green-700 w-3/5 mx-auto py-2 hover:bg-green-800 transition-all duration-300 ease-in-out rounded-xl text-2xl ' onClick={confirmOrder} >Confirm Order</button>
          </div>
        </div>
          )
        }

      </div>
    </div>
  )
}

export default OffCanvas;