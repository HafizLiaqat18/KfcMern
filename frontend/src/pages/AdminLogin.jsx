import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {  postApi } from '../apis';
import { useAtom } from 'jotai';
import { alertMesg } from '../../atom';

function AdminLogin() {

    const [registrationPasswordType, setRegistrationPasswordType] = useState("password");
    const [, setMesg] = useAtom(alertMesg);

  const {
    register: registerForm,
    handleSubmit: handleRegistrationSubmit,
    formState: { errors: registrationErrors },
} = useForm();



const navigate = useNavigate();

    async function onAdminLogin(data) {
        try {
       
            const response = await postApi("admin/login", data);
           
            if (response.status === 200) {
                navigate("/admin/panel");
                setMesg({ message: response.data.message, success: true })
            }
        } catch (err) {
          setMesg({ success: false, message: err.message === "Request failed with status code 404" ? "Invalid Email and Password" : err.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : err.message ==="Request failed with status code 401"?"Invalid Email and Password":err.message});
        }
    }

  return (
    <>
    <div className='w-full h-[80vh] flex justify-center items-center'>

  
      <section
        id="register"
        className="w-[45%] h-full flex items-center flex-col justify-center gap-5"
      >
        <h1 className="text-3xl font-bold text-red-800">Admin Login</h1>
        <form
        
          onSubmit={handleRegistrationSubmit(onAdminLogin)}
          method="post"
          className="flex items-center flex-col justify-center gap-10"
        >
         
          <input
            className="bg-transparent outline-none border-2 p-3 rounded-full text-xl"
            type="email"
            placeholder="Email"
            {...registerForm('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email'
              }
            })}
          />
          {registrationErrors.email && <span className="text-red-500">{registrationErrors.email.message}</span>}
          <div className='border-2 p-3 rounded-full'>

            <input
              className="bg-transparent outline-none  text-xl"
              type={registrationPasswordType}
              placeholder="Password"
              {...registerForm('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least one letter, one number, and one special character'
                }

              })}
            />
            <i className={`w-4 fa-regular ${registrationPasswordType === "password" ? "fa-eye" : "fa-eye-slash"}`} onClick={_ => setRegistrationPasswordType(registrationPasswordType === "text" ? "password" : "text")}></i>
          </div>
          {registrationErrors.password && <span className="text-red-500">{registrationErrors.password.message}</span>}
          

          <input
            type="submit"
            value="Login"
            className="text-white bg-red-700 px-3 py-2 rounded-full font-bold cursor-pointer"
          />
        </form>
      </section>

</div>
    </>
  )
}

export default AdminLogin