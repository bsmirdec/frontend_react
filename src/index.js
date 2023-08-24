// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { BusinessProvider } from "./features/permissions/context/BusinessContext";
import { CartProvider } from "./features/request/context/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BusinessProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </BusinessProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);

// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
