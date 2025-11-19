import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md mt-8">
                <h1 className="text-5xl font-bold">Welcome Back</h1>
                <p className="text-gray-600 font-medium mb-8">Login with Profast</p>

                <div className="space-y-6">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-gray-700"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border bg-white rounded-lg focus:outline-none focus:border-gray-700"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <a href="#" className="text-zinc-600 hover:text-zinc-800 underline">
                            Forget Password?
                        </a>
                    </div>

                    <button
                        // onClick={handleLogin}
                        className="w-full bg-[#CAEB66] font-semibold hover:bg-[#B8D94E] text-zinc-800 py-3 rounded-lg transition-colors"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600">
                        Don't have any account?{' '}
                        <a href="#" className="text-lime-700 hover:text-lime-800">
                            Register
                        </a>
                    </p>

                    <div className="text-center">
                        <p className='text-gray-600'>Or</p>
                    </div>

                    <button
                        // onClick={handleGoogleLogin}
                        className="w-full bg-gray-50 hover:bg-white font-semibold py-3 rounded-lg transition-colors text-zinc-800 flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={24}/>
                        Login with google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;