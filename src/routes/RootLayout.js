import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/layout/Header";

export default function RootLayout() {
    return (
        <div className="root-layout" style={{ paddingBottom: "6vh" }}>
            <ResponsiveAppBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
