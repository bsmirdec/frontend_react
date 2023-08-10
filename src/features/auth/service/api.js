// api.js

import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const instance = axios.create({
    baseURL: baseURL, // Remplacez par l'URL de votre API
});

// Ajouter un intercepteur pour le jeton d'authentification
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt"); // Remplacez par votre méthode de stockage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Ajouter un intercepteur pour gérer les erreurs
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Gérer l'expiration du jeton ici
        }
        return Promise.reject(error);
    },
);

export default instance;
