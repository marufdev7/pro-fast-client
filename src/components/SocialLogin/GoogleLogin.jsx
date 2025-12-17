import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const GoogleLogin = ({ name }) => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const from = location.state?.from || "/";

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log("Login Successful. Welcome Back:",result.user?.displayName );
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