import api from "./api.js";

const userService = {
    createUser: (data) => api.post("/user/cadastrar", data),
    getUser: () => api.get("/user/buscarTodos"),
    deleteUser: (id) => api.delete(`/user/deletarUsuario/${id}`),
    editUser: (id, data) => api.patch(`/user/atualizarUsuario/${id}`, data)
};

export default userService;