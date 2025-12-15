import { useState, useEffect } from "react";
import "../style/editUserModal.css";

function EditUserModal({user, onClose, onSave}) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        birthday: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                birthday: user.birthday ? user.birthday.split('T')[0] : "",
                phone: user.phone || "",
                password: ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    const handleSubmit = () => {
        onSave(user, formData);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar Usuário</h2>
                <div className="modal-form">
                    <label>Username:</label>
                    <input 
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    />
                    <label>Email:</label>
                    <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange} 
                    />
                    <label>Data de Nascimento:</label>
                    <input
                        name="birthday"
                        type="date"
                        value={formData.birthday}
                        onChange={handleChange}
                    />
                    <label>Telefone:</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <label>Senha:</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Deixe em branco para manter a atual"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">
                        <button onClick={handleSubmit} className="btn-save">Salvar</button>
                        <button onClick={onClose} className="btn-cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;