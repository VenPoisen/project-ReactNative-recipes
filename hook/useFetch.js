import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "@env";

const baseUrl = BASE_URL

const useFetch = (endpoint, query, method) => {
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: method ? (method) : "GET",
        url: `${baseUrl}${endpoint}`,
        params: { ...query },
    };

    const fetchData = async () => {
        setisLoading(true);

        try {
            const response = await axios.request(options);
            await new Promise(resolve => setTimeout(resolve, 300));

            setData(response.data);
            setisLoading(false);

        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setisLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;
