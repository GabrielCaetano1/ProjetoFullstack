import { Link } from "react-router-dom";
import "../style/Navbar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <img src="../src/assets/logo.svg" />
            <a href="/">Home</a>
            <a href="/cadastro">Cadastro</a>
        </nav>
    );
}

export default NavBar;