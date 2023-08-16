import useAuth from "../../auth/hooks/useAuth";
import { useBusiness } from "../context/BusinessContext";

const useBusinessInfoUpdater = (employeeInfo) => {
    const { auth } = useAuth();
    const { setBusinessInfo } = useBusiness();

    const updateBusinessInfo = async () => {
        if (auth.accessToken && auth.userId && employeeInfo) {
            const { first_name, last_name, position, manager, permissions } =
                employeeInfo;
            setBusinessInfo({
                firstName: first_name,
                lastName: last_name,
                position,
                manager,
                permissions,
            });
        }
    };

    return updateBusinessInfo;
};

export default useBusinessInfoUpdater;
