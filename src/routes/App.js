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

//features
import AuthContainer from "../features/auth/containers/AuthContainer";

// pages
import HomeContainer from "../features/home/container/HomeContainer";
import WorksitesContainer from "../features/worksite/container/WorksitesContainer";
import NewWorksiteContainer from "../features/worksite/container/NewWorksiteContainer";
import CommandContainer from "../features/command/containers/CommandContainer";
import StaffContainer from "../features/employees/containers/StaffContainer";

// routes
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
        background: {
            default: "#f2f2f2",
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
                                            PERMISSIONS.worksite_view_list,
                                            PERMISSIONS.worksite_retrieve_object,
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
                                            PERMISSIONS.worksite_create_object,
                                        ]}
                                    >
                                        <NewWorksiteContainer />
                                    </RequirePermission>
                                }
                            />
                        </Routes>
                    </RequireAuth>
                }
            />
            <Route
                path="command/"
                element={
                    <RequireAuth>
                        <RequirePermission
                            allowedPermissions={[
                                PERMISSIONS.command_view_list,
                                PERMISSIONS.command_retrieve_object,
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
                                PERMISSIONS.employee_update_object,
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
