import { useEffect, useRef } from 'react';
import { privateApiClient as axiosPrivate, publicApiClient as axiosPublic } from "./AxiosClients";
import { useUser } from './UserContext';
import { useNavigate } from 'react-router';

export const useAxiosPrivate = () => {
    const userDetails = useUser();

    // Flags & queue persisted across renders
    const isRefreshing = useRef<boolean>(false);
      const navigate = useNavigate()
    type QueueItem = {
        resolve: (value: string | null) => void;
        reject: (reason: any) => void;
    };

    const failedQueue = useRef<QueueItem[]>([]);

    const processQueue = (error: any | null, token: string | null) => {
        // 2. Loop through and execute the stored control functions
        failedQueue.current.forEach((item) => {
            if (error) {
                item.reject(error);
            } else {
                item.resolve(token);
            }
        });

        // 3. Clear the queue
        failedQueue.current = [];
    };

    useEffect(() => {
        // 1. Request Interceptor: Attach current access token
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization'] && userDetails?.user?.accessToken) {
                    config.headers['Authorization'] = `Bearer ${userDetails.user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 2. Response Interceptor: Catch 401 & handle token refresh
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error?.config;

                if (error?.response?.status === 401 && !originalRequest?._retry) {
                    // If a refresh call is already happening, queue this request
                    if (isRefreshing.current) {
                        return new Promise((resolve, reject) => {
                            failedQueue.current.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                return axiosPrivate(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing.current = true;

                    try {
                        // Call refresh endpoint via PUBLIC instance (sends HttpOnly cookie)
                        const response = await axiosPublic.post('/refresh');
                        const newAccessToken = response.data.accessToken;
                        const username = response.data.username;

                        // Update Auth Context state
                        userDetails?.setUser((prev) => ({ ...prev,username, accessToken: newAccessToken }));

                        // Drain queued requests
                        processQueue(null, newAccessToken);

                        // Retry original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(originalRequest);
                    } catch (refreshError : any |null) {
                        processQueue(refreshError, null);
                        userDetails?.user.logout(navigate);
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing.current = false;
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup: Eject interceptors to prevent duplicate handlers
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [userDetails]);

    return axiosPrivate;
};