import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import uploadImg from '../../../assets/image-upload-icon.png';
import GoogleLogin from '../../../components/SocialLogin/GoogleLogin';
import axios from 'axios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const { createUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || "/";

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log("User Created Successfully:");
                navigate(from);
            })
            .catch(error => {
                console.error(error);
            })
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_uploadKey}`;
        const res = await axios.post(imageUploadUrl, formData);
        setProfilePic(res.data.data.url);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md mt-8">
                        <h1 className="text-5xl font-bold">Create an Account</h1>
                        <p className="text-gray-600 font-medium mt-1 mb-5">Register with ProFast</p>
                        <label className='cursor-pointer'>
                            <input type="file"
                                onChange={handleImageUpload}
                                className='hidden' accept="image/*" />
                            <img src={uploadImg} alt="Upload" />
                        </label>

                        <div className="space-y-6 mt-5">
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:border-gray-700"
                                    {...register("name", {
                                        required: true,
                                    }
                                    )}
                                />
                            </div>
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
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                                                message: "Must include uppercase, lowercase, and a number"
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



                            <button
                                // onClick={handleLogin}
                                className="w-full btn bg-[#CAEB66] font-semibold border border-slate-300 hover:bg-[#B8D94E] text-zinc-800 rounded-lg transition-colors"
                            >
                                Register
                            </button>

                            <p className="text-center text-gray-600">
                                Already have an Account?{' '}
                                <Link to="/login" className="text-lime-700 hover:text-lime-800">
                                    Login
                                </Link>
                            </p>

                            <div className="text-center">
                                <p className='text-gray-600'>Or</p>
                            </div>

                            <GoogleLogin name="Register" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Register;