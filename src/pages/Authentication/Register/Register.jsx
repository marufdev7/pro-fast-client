import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md mt-8">
                        <h1 className="text-5xl font-bold">Create an Account</h1>
                        <p className="text-gray-600 font-medium mb-8">Register with ProFast</p>

                        <div className="space-y-6">
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
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:border-gray-700"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,

                                    })}
                                />
                                {
                                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                                }
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

export default Register;