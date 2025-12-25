import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';

const GoogleLogin = ({ name }) => {
    const { signInWithGoogle } = useAuth();
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || "/";

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                // update userinfo in the database
                const userInfo = {
                    email: user.email,
                    role: 'user', //default
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const res = await axiosInstance.post('/users', userInfo);
                console.log('user updated info',res.data);

                console.log("Login Successful. Welcome Back:", result.user?.displayName);
                navigate(from);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full btn bg-gray-100 border border-slate-400 hover:bg-gray-300 font-semibold rounded-lg transition-colors text-zinc-800 flex items-center justify-center gap-2"
        >
            <FcGoogle size={24} />
            {name} with google
        </button>
    );
};

export default GoogleLogin;