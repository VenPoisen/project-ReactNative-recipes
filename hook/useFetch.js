import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

const useFetch = (endpoint, query) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `${baseUrl}${endpoint}`,
        params: { ...query },
    };

    const fetchRecipes = async () => {
        setisLoading(true);

        try {
            const response = await axios.request(options);
            await new Promise(resolve => setTimeout(resolve, 300));

            setRecipes(response.data);
            setisLoading(false);

        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const refetch = () => {
        setisLoading(true);
        fetchRecipes();
    }

    return { recipes, isLoading, error, refetch };
}

export default useFetch;
