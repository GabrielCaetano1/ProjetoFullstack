import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/UserForm.css";
import userService from "../service/userService.js";

function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.username.length < 3) {
      newErrors.username = "O nome de usuário deve ter pelo menos 3 caracteres.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!formData.birthday) {
      newErrors.birthday = "A data de nascimento é obrigatória.";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Insira um e-mail válido.";
    }
    if (formData.phone && formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "O número de telefone deve ter pelo menos 10 dígitos.";
    } // a primeira parte desse if indica que o campo é opcional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validate()) { 
      setIsSubmitting(false);
      return;
    }

    try {
      const cleanData = {
        ...formData,
        birthday: formData.birthday ? formData.birthday : null,
        phone: formData.phone.replace(/\D/g, "") // remove formatação pra enviar pro back
      }
      const response = await userService.createUser(cleanData);
      
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado!",
        confirmButtonText: "Ir para HomePage",
        background: "#242e4c",
        color: "#fff",
        confirmButtonColor: "#f073c8",
      }).then(() => {
        navigate("/");
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro no cadastro",
        text: "Não foi possível cadastrar o usuário.",
        confirmButtonText: "Ok",
        background: "#242e4c",
        color: "#fff",
        confirmButtonColor: "#ff6b6b",
      })
      console.error("Erro no backend:", error);
      
    }
  };

  return (
    <div className="registration-page">
      <form className="card-cadastro" onSubmit={handleSubmit}>
        <div className="titulo">
          <h3>Cadastro de Usuário</h3>
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username && isSubmitting ? "input-error" : ""}
          />
          {errors.username && isSubmitting && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password && isSubmitting ? "input-error" : ""}
          />
          {errors.password && isSubmitting && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div>
          <label>Data de nascimento:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className={errors.birthday && isSubmitting ? "input-error" : ""}
          />
          {errors.birthday && isSubmitting && (
            <p className="error-message">{errors.birthday}</p>
          )}
        </div>
        <div>
          <label>Telefone:</label>
          <input 
          type="tel"
          name="phone"
          maxLength="15"
          value={formData.phone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");

            if (value.length > 11) {
              value = value.slice(0, 11);
            }

            if (value.length > 6) {
              value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
            } else if (value.length > 2) {
              value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
            }
            setFormData({ ...formData, phone: value})
          }}
          placeholder="(00) 12345-6789"
          className={errors.phone && isSubmitting ? "input-error" : ""} />
          {errors.phone && isSubmitting && (
            <p className="error-message">{errors.phone}</p>
          )}
        </div>

        <div className="input-group-submit">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email && isSubmitting ? "input-error" : ""}
          />
          {errors.email && isSubmitting && (
            <p className="error-message">{errors.email}</p>
          )}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
