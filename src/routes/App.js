import React, { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Routes,
    RouterProvider,
} from "react-router-dom";

import WebFont from "webfontloader";

//Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";

//Authentification
import AuthContainer from "../features/auth/containers/AuthContainer";

// pages
import HomeContainer from "../features/home/container/HomeContainer";
import WorksitesContainer from "../features/worksite/container/WorksitesContainer";
import NewWorksiteContainer from "../features/worksite/container/NewWorksiteContainer";
import UpdateWorksiteContainer from "../features/worksite/container/UpdateWorksiteContainer";
import CommandContainer from "../features/request/containers/CommandContainer";
import StaffContainer from "../features/employees/containers/StaffContainer";

// routes
import PrivateRoute from "../features/auth/components/PrivateRoute";
import RootLayout from "./RootLayout";
import RequireAuth from "../features/auth/components/RequireAuth";
// import PersistLogin from "../features/auth/components/PersistLogin";
import RequirePermission from "../features/permissions/components/RequirePermission";

// permissions
import { PERMISSIONS } from "../features/permissions/PERMISSIONS";
import Unauthorized from "../features/permissions/components/Unauthorized";

const theme = createTheme({
    palette: {
        primary: {
            main: "#30477c",
            light: "#6c82b3",
            dark: "1e3055",
        },
        secondary: {
            main: "#68252a",
            light: "#a0484e",
            dark: "3b0001",
        },
        info: {
            main: "#14638a",
        },
    },
    typography: {
        fontFamily: "Maven Pro, sans-serif",
    },
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="auth/*" element={<AuthContainer />} />
            <Route path="unauthorized/" element={<Unauthorized />} />
            <Route
                index
                element={
                    <RequireAuth>
                        <HomeContainer />
                    </RequireAuth>
                }
            />
            <Route
                path="worksite/*"
                element={
                    <RequireAuth>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <RequirePermission
                                        allowedPermissions={[
                                            PERMISSIONS.worksite_view_list.code,
                                            PERMISSIONS.worksite_retrieve_object
                                                .code,
                                        ]}
                                    >
                                        <WorksitesContainer />
                                    </RequirePermission>
                                }
                            />
                            <Route
                                path="create/"
                                element={
                                    <RequirePermission
                                        allowedPermissions={[
                                            PERMISSIONS.worksite_create_object
                                                .code,
                                        ]}
                                    >
                                        <NewWorksiteContainer />
                                    </RequirePermission>
                                }
                            />
                            <Route
                                path="update/*"
                                element={
                                    <RequirePermission
                                        allowedPermissions={[
                                            PERMISSIONS.worksite_update_object
                                                .code,
                                        ]}
                                    >
                                        <UpdateWorksiteContainer />
                                    </RequirePermission>
                                }
                            />
                        </Routes>
                    </RequireAuth>
                }
            />
            <Route
                path="request/"
                element={
                    <RequireAuth>
                        <RequirePermission
                            allowedPermissions={[
                                PERMISSIONS.request_view_list.code,
                            ]}
                        >
                            <CommandContainer />
                        </RequirePermission>
                    </RequireAuth>
                }
            />
            <Route
                path="employee/"
                element={
                    <RequireAuth>
                        <RequirePermission
                            allowedPermissions={[
                                PERMISSIONS.employee_update_object.code,
                            ]}
                        >
                            <StaffContainer />
                        </RequirePermission>
                    </RequireAuth>
                }
            />
        </Route>,
    ),
);

function App() {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Maven Pro:300,400,500,700"], // Spécifiez les poids de police Maven Pro souhaités
            },
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
