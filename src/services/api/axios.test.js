import axiosInstance from "./axios"; // Remplacez le chemin d'accès par le chemin réel vers votre fichier axiosInstance.js
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Créez une instance de MockAdapter et associez-la à axiosInstance
const mock = new MockAdapter(axiosInstance);

// Testez une requête GET simulée
test("axiosInstance GET request", async () => {
    const responseData = { key: "value" };
    mock.onGet("/endpoint").reply(200, responseData);

    const response = await axiosInstance.get("/endpoint");

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
});

// Testez une requête POST simulée
test("axiosInstance POST request", async () => {
    const requestData = { key: "value" };
    const responseData = { message: "Success" };
    mock.onPost("/endpoint", requestData).reply(200, responseData);

    const response = await axiosInstance.post("/endpoint", requestData);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
});

// Testez une erreur de requête simulée
test("axiosInstance error request", async () => {
    const errorMessage = "Not found";
    mock.onGet("/not-found").reply(404, { message: errorMessage });

    try {
        await axiosInstance.get("/not-found");
    } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.message).toBe(errorMessage);
    }
});
