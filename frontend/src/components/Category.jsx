import React, { useEffect, useState } from 'react';
import { Circles } from "react-loader-spinner";
import { getApi } from '../apis';
import { useAtom } from 'jotai';
import { allProductsAtom, filteredProductsAtom } from '../../atom';

function Category() {
  const [, setFilteredProducts] = useAtom(filteredProductsAtom);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mesg, setMesg] = useState(null); // Define the missing state

  useEffect(() => {
    async function getCategories() {
      try {
        setLoadingCategories(true);
        const response = await getApi("category");
        setCategories(response.data.data);
      } catch (err) {
        setMesg({ 
            success: false, 
            message: err.message === "Request failed with status code 404" 
                ? "Invalid Email and Password" 
                : err.message === "Request failed with status code 500" 
                ? "Something went wrong! Check your connection" 
                : err.message 
        });
      } finally {
        setLoadingCategories(false);
      }
    }
    getCategories();
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category.title);
    setFilteredProducts(category); // Filter and update products based on the selected category
  };

  return (
    <div className='bg-black text-white flex gap-3 flex-wrap justify-evenly items-center px-5 py-6'>
      {mesg && (
        <div className={`text-center py-2 ${mesg.success ? "text-green-500" : "text-red-500"}`}>
          {mesg.message}
        </div>
      )}
      {loadingCategories ? (
        <Circles
          height="80"
          width="80"
          color="#B8052E"
          ariaLabel="circles-loading"
          visible={true}
        />
      ) : (
        categories.map((category, i) => (
          <button
            key={i}
            className={`text-xl font-bold px-2 py-3 rounded-lg ${selectedCategory === category.title ? "bg-red-500" : "bg-gray-600"}`}
            onClick={() => handleClick(category)}
          >
            {category.title}
          </button>
        ))
      )}
    </div>
  );
}

export default Category;
