import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEmployee } from "../../employees/hooks/useEmployee";
import useBusinessInfoUpdater from "../../permissions/hooks/useBusinessInfoUpdater";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth?.accessToken, refresh]);

    const employeeInfo = useEmployee(auth.userId);
    useBusinessInfoUpdater(employeeInfo);

    return <div>{isLoading ? <p>Chargement ...</p> : <Outlet />}</div>;
};

export default PersistLogin;
