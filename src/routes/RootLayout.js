import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function RootLayout() {
    return (
        <div className="root-layout" style={{ paddingBottom: "6vh" }}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
