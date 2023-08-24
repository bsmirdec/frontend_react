import React from "react";
import { useLocation } from "react-router-dom";
import UpdateWorksiteForm from "../components/UpdateWorksiteForm";
import UpdateWorksiteEmployee from "../components/UpdateWorksiteEmployees";

const UpdateWorksiteContainer = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname === "/worksite/update" && <UpdateWorksiteForm />}
            {location.pathname === "/worksite/update/employees" && (
                <UpdateWorksiteEmployee />
            )}
        </div>
    );
};

export default UpdateWorksiteContainer;
