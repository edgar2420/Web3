import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../../service/ApiService";
import { useUser } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function FormularioInicioSesion() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  // Manejador para capturar los datos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const response = await ApiService.login({
        email: formData.email,
        password: formData.password,
      });

      // Actualizar el estado global con los datos del usuario y carrito
      login(response.usuario, response.carrito);

      setError("");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mb-4 my-5 col-lg-4 col-sm-6 col-10">
      <div className="card-body">
        <h4 className="mb-4">Iniciar sesión</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex mb-3">
            <a href="#" className="text-decoration-none">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando..." : "Iniciar sesión"}
          </button>
          <p className="mb-0 mt-4 text-center">
            ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
}
