import React from 'react';
import Loading from '../components/Loading/Loading';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const RiderRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />
    }

    if (!user || role !== 'rider') {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default RiderRoute;