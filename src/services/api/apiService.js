// apiService.js

import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Utilisez une variable d'environnement pour l'URL de base de l'API
    timeout: 10000, // Délai d'attente pour les requêtes en millisecondes
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur de requête pour ajouter des en-têtes ou des logiques avant l'envoi de la requête
instance.interceptors.request.use(
    (config) => {
        // Ajoutez ici des en-têtes d'autorisation si nécessaire
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Intercepteur de réponse pour gérer les erreurs ou les logiques après réception de la réponse
instance.interceptors.response.use(
    (response) => {
        // Vous pouvez ajouter ici une logique de gestion de réponse globale si nécessaire
        return response.data;
    },
    (error) => {
        // Gestion globale des erreurs d'API
        if (error.response) {
            // Traitez les erreurs de réponse (statut de code non 2xx)
            console.error("API Error:", error.response);
        } else if (error.request) {
            // Aucune réponse reçue
            console.error("No response received:", error.request);
        } else {
            // Erreur lors de la configuration de la requête
            console.error("Request error:", error.message);
        }
        return Promise.reject(error);
    },
);

// Fonction réutilisable pour effectuer des appels API
export const apiService = {
    get: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance
                .get(url, { params })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    post: (url, data) => instance.post(url, data),
    put: (url, data) => instance.put(url, data),
    patch: (url, data) => instance.patch(url, data),
    delete: (url) => instance.delete(url),
};
