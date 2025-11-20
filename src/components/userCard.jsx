import "../style/UserCard.css";

function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className="user-card">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Data de Nascimento: {new Date(user.birthday).toLocaleDateString("pt-Br")}</p>
            <p>Telefone: {user.phone}</p>
            <div className="user-card-buttons">
                <button 
                    className="btn-edit" 
                    onClick={() => onEdit(user)}>
                        ✏️</button>                
                <button 
                    className="btn-delete" 
                    onClick={() => {
                        onDelete(user)
                    }}>
                        ❌</button>
            </div>
        </div>
    );
};

export default UserCard;