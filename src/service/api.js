import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {"Content-Type": "application/json"}
});

api.interceptors.response.use(
    response => response,
    error => {
        console.log("Erro na requisição: ", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api