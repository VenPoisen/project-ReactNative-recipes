import { useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

const AuthChecker = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Verify if the keys are save on SecureStore
                const accessToken = await SecureStore.getItemAsync("accessToken");
                const refreshToken = await SecureStore.getItemAsync("refreshToken");

                if (accessToken) {

                    // Verify if access token is valid (response 200)
                    const accessResponse = await axios.post(`${baseUrl}token/verify/`, { "token": accessToken });
                    const accessStatus = accessResponse.status;

                    if (accessStatus === 200) {
                        // Update access token on SecureStore
                        const refreshResponse = await axios.post(`${baseUrl}token/refresh/`, { "refresh": refreshToken })
                        const refreshStatus = refreshResponse.status;

                        // Verify if access token was updated (response 200)
                        if (refreshStatus === 200) {
                            await SecureStore.setItemAsync("accessToken", refreshResponse.data.access)
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                        }

                    } else {
                        setIsAuthenticated(false);
                    }

                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    return isAuthenticated ? true : false;
}

export default AuthChecker;