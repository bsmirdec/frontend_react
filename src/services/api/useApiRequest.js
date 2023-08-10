import { useState, useEffect } from "react";

const useApiRequest = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiFunction();
                setData(response.data);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    setError(error.response.data.error);
                } else {
                    setError("Une erreur s'est produite. Veuillez réessayer.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Utilisez un tableau vide ici pour exécuter le hook useEffect une seule fois

    return { data, loading, error };
};

export default useApiRequest;
