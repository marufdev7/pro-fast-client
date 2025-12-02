import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] bg-gray-50">
                <div className="flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin">
                    </div>

                    <p className="text-sm text-emerald-700 font-medium">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;