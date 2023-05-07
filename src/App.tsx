import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CourseList from "./components/CourseList/CourseList";
import CourseForm from "./components/CourseForm/CourseForm";


export default function App() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("Authorization-Token");

  const logout = () => {
    AuthService.logout();
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {accessToken ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/courses" className="nav-link">
                Lista de Cursos
              </a>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Cadastrar
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/courses" element={
            localStorage.getItem("Authorization-Token") ? <CourseList /> : <Navigate to="/login" />
          } />
          <Route path="/courses/new" element={
            localStorage.getItem("Authorization-Token") ? <CourseForm /> : <Navigate to="/login" />
          } />
          <Route path="/courses/:courseId" element={
            localStorage.getItem("Authorization-Token") ? <CourseForm /> : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );

}
