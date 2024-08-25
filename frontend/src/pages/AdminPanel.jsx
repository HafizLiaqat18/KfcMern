import React from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { alertMesg } from '../../atom';
import { postApi } from '../apis';


function AdminPanel() {


    const [,setMesg] = useAtom(alertMesg);
    const {
        register: createProductForm,
        handleSubmit: handleCreateProduct,
        formState: { errors: registrationErrors },
    } = useForm();

   async function onCreateProduct(data) {
    try{

        const response = await postApi("admin/upload",data);
        setMesg({message:response.data.message,success:true});
        

    }catch(err){
        setMesg({message:err.message,success:false})

    }
       

      
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-center text-red-500 my-10">Create New Product</h1>
            <div className="flex justify-center items-center h-[80vh]">
                <form
                    onSubmit={handleCreateProduct(onCreateProduct)}
                    className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="number"
                                placeholder="Product Id"
                                {...createProductForm('productId', {
                                    required: 'Product Id is required',
                                })}
                            />
                            {registrationErrors.productId && (
                                <span className="text-red-500">{registrationErrors.productId.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="number"
                                placeholder="Category Id"
                                {...createProductForm('categoryId', {
                                    required: 'Category Id is required',
                                })}
                            />
                            {registrationErrors.categoryId && (
                                <span className="text-red-500">{registrationErrors.categoryId.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="text"
                                placeholder="Title"
                                {...createProductForm('title', {
                                    required: 'Title is required',
                                })}
                            />
                            {registrationErrors.title && (
                                <span className="text-red-500">{registrationErrors.title.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="text"
                                placeholder="Description"
                                {...createProductForm('description', {
                                    required: 'Description is required',
                                })}
                            />
                            {registrationErrors.description && (
                                <span className="text-red-500">{registrationErrors.description.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="text"
                                placeholder="Image URL"
                                {...createProductForm('image', {
                                    required: 'Image URL is required',
                                })}
                            />
                            {registrationErrors.image && (
                                <span className="text-red-500">{registrationErrors.image.message}</span>
                            )}
                        </div>

                        <div>
                            <input
                                className="w-full p-4 bg-transparent border-2 border-gray-500 rounded-lg text-xl placeholder-gray-400 focus:outline-none focus:border-red-500"
                                type="number"
                                placeholder="Price"
                                {...createProductForm('price', {
                                    required: 'Price is required',
                                })}
                            />
                            {registrationErrors.price && (
                                <span className="text-red-500">{registrationErrors.price.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <input
                            type="submit"
                            value="Create Product"
                            className="px-10 py-3 text-2xl font-bold text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-600"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminPanel;
