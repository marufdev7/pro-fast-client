import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/Loading/Loading';

const AdminRoute = () => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />
    }

    if (!user || role !== 'admin') {
        return ;
    }
    return (
        <div>

        </div>
    );
};

export default AdminRoute;