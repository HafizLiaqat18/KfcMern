import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {  postApi } from '../apis';
import { useAtom } from 'jotai';
import { alertMesg } from '../../atom';

function RegistrationPage() {
    const [loginPasswordType, setLoginPasswordType] = useState("password");
    const [registrationPasswordType, setRegistrationPasswordType] = useState("password");
    const [, setMesg] = useAtom(alertMesg);
    const {
        register: registerForm,
        handleSubmit: handleRegistrationSubmit,
        formState: { errors: registrationErrors },
    } = useForm();

    const {
        register: loginForm,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm();

 

    const navigate = useNavigate();

    async function onRegistration(data) {
        try {
            const response = await postApi("registerUser", data);
        
            if (response.status === 201) {
                navigate("/home");
                setMesg({ message: "User registered Successfully", success: true })
            }
        } catch (err) {
         
            setMesg({ success: false, message: err.message === "Request failed with status code 404" ? "Invalid Email and Password" : err.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : err.message ==="Request failed with status code 401"?"Invalid Email and Password":err.message});
        }
    }


    async function onLogin(data) {
        try {
            const responseData = await postApi("login", data);
            if (responseData.status === 200) {
                navigate("/home");
                setMesg({ message: "Login Successfully ", success: true })
            }
        } catch (err) {
            setMesg({ success: false, message: err.message === "Request failed with status code 404" ? "Invalid Email and Password" : err.message === "Request failed with status code 500" ? "Something went wrong! Check your connection" : err.message ==="Request failed with status code 401"?"Invalid Email and Password":err.message});
        }
    }


    return (
        <>
            <main className="h-screen w-full px-5 bg-black text-slate-100">
                <div className="w-full h-full flex items-center justify-center md:flex-row flex-col gap-5">
                    <section
                        id="register"
                        className="w-[45%] h-full flex items-center flex-col justify-center gap-5"
                    >
                        <h1 className="text-3xl font-bold text-red-800">Register</h1>
                        <form
                            onSubmit={handleRegistrationSubmit(onRegistration)}
                            method="post"
                            className="flex items-center flex-col justify-center gap-10"
                        >
                            <input
                                className="bg-transparent outline-none border-2 p-3 rounded-full text-xl"
                                type="text"
                                placeholder="User Name"
                                {...registerForm('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Username must be at least 4 characters'
                                    }
                                })}
                            />
                            {registrationErrors.username && <span className="text-red-500">{registrationErrors.username.message}</span>}

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
                            <ul className='text-sm'>
                                <li>Password must be at least 8 characters</li>
                                <li>Password must contain at least one letter and one number</li>
                            </ul>

                            <input
                                type="submit"
                                value="Register"
                                className="text-white bg-red-700 px-3 py-2 rounded-full font-bold cursor-pointer"
                            />
                        </form>
                    </section>

                    <div className="bg-red-700 rounded-full h-9 px-4 py-2 flex items-center justify-center">
                        <span className="w-full text-white">OR</span>
                    </div>

                    <section
                        id="login"
                        className="w-[45%] h-full flex items-center flex-col justify-center gap-5"
                    >
                        <h1 className="text-3xl font-bold text-red-800">Login</h1>
                        <form
                            onSubmit={handleLoginSubmit(onLogin)}
                            method="post"
                            className="flex items-center flex-col justify-center gap-10"
                        >
                            <input
                                className="bg-transparent outline-none border-2 p-3 rounded-full text-xl"
                                type="email"
                                placeholder="Email"
                                {...loginForm('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email'
                                    }
                                })}
                            />
                            {loginErrors.email && <span className="text-red-500">{loginErrors.email.message}</span>}
                            <div className=' border-2 rounded-full p-3'>

                                <input
                                    className="bg-transparent outline-none   text-xl"
                                    type={loginPasswordType}
                                    placeholder="Password"

                                    {...loginForm('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        }
                                    })}
                                />

                                <i className={`w-4 fa-regular ${loginPasswordType === "password" ? "fa-eye" : "fa-eye-slash"}`} onClick={_ => setLoginPasswordType(loginPasswordType === "text" ? "password" : "text")}></i>

                            </div>
                            {loginErrors.password && <span className="text-red-500">{loginErrors.password.message}</span>}

                            <input
                                type="submit"
                                value="Login"
                                className="text-white bg-red-800 px-3 py-2 rounded-full font-bold cursor-pointer"
                            />
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}

export default RegistrationPage;
