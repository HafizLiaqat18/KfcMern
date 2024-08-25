import { atom } from "jotai";



const allProductsAtom = atom([]);
const filterProducts = atom([]);
const productDetail =atom({});
const alertMesg = atom({message:"",success:false})

const productsAddToCart = atom ([]);
const OffCanvasValue = atom(false)

const filteredProductsAtom = atom(
  (get) => get(allProductsAtom), 
  (get, set, category) => {
    const products = get(allProductsAtom);
    if (category.title === "All") {
      set(filterProducts, products);
    } else {
      const filtered = products.filter(product => product.categoryId === category.id);
      set(filterProducts, filtered); 
    }
  }
);


export { allProductsAtom, filteredProductsAtom,filterProducts,productDetail,productsAddToCart,OffCanvasValue,alertMesg };

