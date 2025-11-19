import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UserForm from "./pages/userForm.jsx";
import HomePage from "./pages/homePage.jsx";
import NavBar from "./components/navBar.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <HomePage />
          </>}
           />
        <Route path="/cadastro" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
