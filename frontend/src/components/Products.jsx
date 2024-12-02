import React, { useEffect, useState } from 'react';
import KfcCard from '../components/KfcCard';
import ProductShimmerEffect from './ProductShimmerEffect';
import { getApi } from '../apis';
import { useAtom } from 'jotai';
import { allProductsAtom,filterProducts,alertMesg } from '../../atom';
import ProductDetailSideBar from './ProductDetailSideBar';
import EmptyProductList from './EmptyProductList';

function Products() {
  const [, setProducts] = useAtom(allProductsAtom);
  const [newFilterProducts,setFilteredProducts] = useAtom(filterProducts);
  const [mesg,setMesg] = useAtom(alertMesg);
  const [loadingProducts, setLoadingProducts] = useState(true);


  useEffect(() => {
    async function getData() {
      try {
        setLoadingProducts(true);
        const response = await getApi("products");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data) // Set all products
      } catch (err) {
        setMesg({ success: false, message: err.message === "Request failed with status code 404" ? "Not Found" : err.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : err.message });
      } finally {
        setLoadingProducts(false);
      }
    }
    getData();
  }, [setProducts]);

  return (
    <>


    <ProductDetailSideBar/>
    <div className={`w-full  ${newFilterProducts.length==0?"h-[60vh]" :"h-auto"}  p-5 bg-black flex flex-row gap-5 justify-center lg:justify-between items-center flex-wrap text-slate-100`}>
      {
        loadingProducts ? (
          Array.from({ length: 10 }).map((_, i) => (
            <ProductShimmerEffect key={i} />
          ))
        ) : (
          newFilterProducts.length > 0 ? (
            newFilterProducts.map((product,i) => (
              <KfcCard key={i}product={product} />
            ))
          ) : (
           
            <div className='w-full h-full flex justify-center items-center ' >
            <div className='w-1/2'>

           <EmptyProductList text="Exciting items are coming your way soon! Stay tuned for updates." />
            </div>
            </div>
          )
        )
      }
    </div>
    </>
  );
}

export default Products;
