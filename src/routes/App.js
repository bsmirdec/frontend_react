import React, { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import WebFont from "webfontloader";

//Material UI
import { createTheme, ThemeProvider } from "@mui/material/styles";

//features
import AuthContainer from "../features/auth/containers/AuthContainer";

// pages
import Home from "../pages/Home/Home";
import Worksites from "../pages/Worksites/Worksites";
import Command from "../pages/Command/Command";

// routes
import RootLayout from "./RootLayout";
import RequireAuth from "../features/auth/components/RequireAuth";

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
            <Route index element={<Home />} />
            <Route path="auth/*" element={<AuthContainer />} />
            <Route path="unauthorized/" element={<Unauthorized />} />
            <Route
                path="worksite/"
                element={
                    <RequireAuth
                        allowedPermissions={[
                            PERMISSIONS.worksite_view_list,
                            PERMISSIONS.worksite_retrieve_object,
                        ]}
                    >
                        <Worksites />
                    </RequireAuth>
                }
            />
            <Route
                path="command/"
                element={
                    <RequireAuth
                        allowedPermissions={[
                            PERMISSIONS.command_view_list,
                            PERMISSIONS.command_retrieve_object,
                        ]}
                    >
                        <Command />
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
