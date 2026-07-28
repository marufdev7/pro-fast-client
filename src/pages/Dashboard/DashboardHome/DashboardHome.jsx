import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();
    console.log(role, roleLoading);

    if (roleLoading) {
        {
            return <Loading />;
        }
    };

    if (role === 'admin') {
        return <AdminDashboardHome />;
    }
    else if (role === 'rider') {
        return <RiderDashboardHome />;
    }
    else {
        return <UserDashboardHome />;
    }
};

export default DashboardHome;