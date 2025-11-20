import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div class="flex items-center justify-center min-h-[200px] bg-linear-to-br from-blue-600 to-indigo-700">
            <div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">

                <span class="loading loading-ring loading-lg text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"></span>

                <p class="mt-3 text-white text-sm tracking-wide opacity-80">
                    Loading, please wait...
                </p>
            </div>
        </div>
    }

    if (!user) {
        <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;