import {useEffect, useState} from "react"
import "../style/Navbar.css"

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
        useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 100); // ativa a sombra após rolar 10px
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <img src="../src/assets/logo.svg" alt="logo"/>
            <a href="/">Início</a>
            <a href="/cadastro">Cadastro</a>
            <a href="/#">Contato</a>
        </nav>
    );
}

export default NavBar;