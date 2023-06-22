import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

export const sendImageToAPI = async (uri, fileName, type, recipeID, setIsError) => {

    const formData = new FormData();
    formData.append(
        'cover',
        {
            uri,
            name: fileName,
            type
        }
    );

    try {
        const token = await SecureStore.getItemAsync('accessToken')

        const response = await axios.patch(
            `${baseUrl}v2/${recipeID}/`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        if (response.status === 200) {
            Alert.alert('Image uploaded successfully');
            setIsError(false);
        } else {
            Alert.alert('Error sending the image, try again: status code', response.status);
            setIsError(true);
        }
    } catch (error) {
        Alert.alert(
            'Network error. Please try again in a few minutes or choose another image:',
            error
        );
        setIsError(true);
    }
};

