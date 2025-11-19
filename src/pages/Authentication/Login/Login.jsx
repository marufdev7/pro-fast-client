import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md mt-8">
                        <h1 className="text-5xl font-bold">Welcome Back</h1>
                        <p className="text-gray-600 font-medium mb-8">Login with ProFast</p>

                        <div className="space-y-6">
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:border-gray-700"
                                    {...register("email", {
                                        required: true,
                                    }
                                    )}
                                />
                            </div>

                            <div>
                                <label>Password</label>

                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full px-4 py-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:border-gray-700"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                    />

                                    <span
                                        onClick={() => setShow(!show)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </span>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="text-left">
                                <a href="#" className="text-zinc-600 hover:text-zinc-800 underline">
                                    Forget Password?
                                </a>
                            </div>

                            <button
                                // onClick={handleLogin}
                                className="w-full btn bg-[#CAEB66] border border-slate-300 font-semibold hover:bg-[#B8D94E] text-zinc-800 rounded-lg transition-colors"
                            >
                                Login
                            </button>

                            <p className="text-center text-gray-600">
                                Don't have any account?{' '}
                                <Link to="/register" className="text-lime-700 hover:text-lime-800">
                                    Register
                                </Link>
                            </p>

                            <div className="text-center">
                                <p className='text-gray-600'>Or</p>
                            </div>

                            <button
                                // onClick={handleGoogleLogin}
                                className="w-full btn bg-gray-50 border border-slate-400 hover:bg-white font-semibold rounded-lg transition-colors text-zinc-800 flex items-center justify-center gap-2"
                            >
                                <FcGoogle size={24} />
                                Login with google
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;