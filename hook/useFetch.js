import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    const baseUrl = "http://localhost/recipes/api/v2/";

    const options = {
        method: 'GET',
        url: `${baseUrl}`,
        params: { ...query },
    };

    const fetchRecipes = async () => {
        setisLoading(true);

        try {
            const response = await axios.request(options);
            await new Promise(resolve => setTimeout(resolve, 600));

            console.log(response)
            setRecipes(response);
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
