// auth.js

import { useMutation, useQueryClient } from "react-query";
import axios from "./api";

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation((credentials) => axios.post("/login", credentials), {
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);
            // Rafraîchir les requêtes en cours après une connexion réussie
            queryClient.invalidateQueries();
        },
    });
}

export function useRefreshTokenMutation() {
    return useMutation(() => axios.post("/refresh-token"), {
        onSuccess: (data) => {
            localStorage.setItem("jwt", data.token);
        },
    });
}
