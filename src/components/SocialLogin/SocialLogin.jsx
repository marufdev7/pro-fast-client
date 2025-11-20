import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = ({name}) => {
    return (
        <button
            className="w-full btn bg-gray-100 border border-slate-400 hover:bg-gray-300 font-semibold rounded-lg transition-colors text-zinc-800 flex items-center justify-center gap-2"
        >
            <FcGoogle size={24} />
            {name} with google
        </button>
    );
};

export default SocialLogin;