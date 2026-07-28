import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isPending, isError, error, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email,
        staleTime: 5 * 60 * 1000,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        },
    });

    // A disabled query stays "pending" forever in React Query v5, so only treat
    // isPending as loading when there is actually a user to fetch a role for.
    const roleLoading = loading || (!!user?.email && isPending);

    return { role: role ?? null, roleLoading, isError, error, refetch };
};

export default useUserRole;
