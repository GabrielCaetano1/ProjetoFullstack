import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import "../style/homePage.css";
import userService from "../service/userService.js";
import UserCard from "../components/userCard.jsx";

function HomePage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await userService.getUser();
            
            setUsers(response.data);

        } catch (error) {
            setError("Erro ao carregar usuários.");
            console.error("Erro ao buscar usuários: ", error);
            
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (user) => {        
        const confirm = await Swal.fire({
            title: `Excluir usuário ${user.name}?`,
            text: "Essa ação não pode ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff6b6b",
            cancelButtonColor: "#97a5ce",
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
            background: "#242e4c",
            color: "#fff",
        });

        if (!confirm.isConfirmed) return;

        try {
            await userService.deleteUser(user.id);
            await fetchUsers();
            Swal.fire({
                title: "Usuário excluído!",
                icon: "success",
                confirmButtonColor: "#f073c8",
                background: "#242e4c",
                color: "#fff",
            });
        } catch (error) {
            Swal.fire({
                title: "Erro ao excluir usuário.",
                icon: "error",
                text: "Falha ao tentar excluir o usuário.",
                background: "#242e4c",
                color: "#fff"
            })
        }


    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <p style={{color: "#fff", display: "flex", justifyContent: "center"}}>Carregando...</p>
    }
    if (error) {
        return <p style={{color: "red", display: "flex", justifyContent: "center"}}>{error}</p>
    }

    return(
        <div className="homepage-container">
            <div>
                <h1>Lista de usuarios cadastrados:</h1>
                {users.length === 0 && (<p style={{color: "#fff"}}>Nenhum usuário encontrado!!!</p>)}
                <div className="user-list">
                    {users.map((user) => (
                        <UserCard 
                        key={user.id} 
                        user={user}
                        onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default HomePage;