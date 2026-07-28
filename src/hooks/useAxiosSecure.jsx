import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestId = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        })

        const responseId = axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            const status = error.response?.status;
            if (status === 403) {
                navigate('/forbidden');
            }
            else if (status === 401) {
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(() => { })
            }

            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(requestId);
            axiosSecure.interceptors.response.eject(responseId);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;