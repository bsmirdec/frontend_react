// ApiErrorLoadingWrapper.js
import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/layout/ErrorMessage";
import Loading from "../../components/layout/Loading";

const ApiErrorLoadingWrapper = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleGlobalError = (error) => {
            console.error(error);
            setLoading(false); // Arrêter le chargement en cas d'erreur

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(
                    "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
                );
            }
        };

        window.addEventListener("error", handleGlobalError);
        return () => {
            window.removeEventListener("error", handleGlobalError);
        };
    }, []);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorMessage message={errorMessage} />
            ) : (
                <React.Fragment>{children}</React.Fragment>
            )}
        </div>
    );
};

export default ApiErrorLoadingWrapper;
