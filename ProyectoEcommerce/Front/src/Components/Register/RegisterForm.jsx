import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import { ApiService } from "../../service/ApiService";

export default function FormularioRegistro() {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ciudad: "",
    direccion: "",
    email: "",
    telefono: "",
    password: "",
    repetirPassword: "",
    tipoUsuario: "comprador", // Valor predeterminado
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar indicador de carga

  const navigate = useNavigate(); // Instanciar useNavigate

  // Manejador para capturar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (formData.password !== formData.repetirPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!["comprador", "vendedor", "ambos"].includes(formData.tipoUsuario)) {
      setError("Selecciona un tipo de usuario válido.");
      return;
    }

    setIsLoading(true); // Activar indicador de carga
    try {
      // Llamada al servicio para registrar usuario
      const response = await ApiService.createUsuario({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        tipoUsuario: formData.tipoUsuario,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
      });

      setSuccess("Usuario registrado con éxito");
      setError("");

      // Resetear formulario
      setFormData({
        nombre: "",
        apellido: "",
        ciudad: "",
        direccion: "",
        email: "",
        telefono: "",
        password: "",
        repetirPassword: "",
        tipoUsuario: "comprador",
      });

      // Redirigir a la página de inicio de sesión
      setTimeout(() => {
        navigate("/signin"); // Redirección
      }, 2000); // Esperar 2 segundos para mostrar el mensaje de éxito
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrar usuario");
      setSuccess("");
    } finally {
      setIsLoading(false); // Desactivar indicador de carga
    }
  };

  return (
    <div className="card mb-4 my-5 col-lg-5 col-sm-8 col-10">
      <article className="card-body">
        <h4 className="mb-4">Crear cuenta</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row gx-3">
            <div className="col mb-4">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col mb-4">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-auto mb-3">
              <label className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoUsuario"
                  value="comprador"
                  checked={formData.tipoUsuario === "comprador"}
                  onChange={handleChange}
                />
                <span className="form-check-label"> Comprador </span>
              </label>
            </div>
            <div className="col-auto mb-3">
              <label className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoUsuario"
                  value="vendedor"
                  checked={formData.tipoUsuario === "vendedor"}
                  onChange={handleChange}
                />
                <span className="form-check-label"> Vendedor </span>
              </label>
            </div>
            <div className="col-auto mb-3">
              <label className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipoUsuario"
                  value="ambos"
                  checked={formData.tipoUsuario === "ambos"}
                  onChange={handleChange}
                />
                <span className="form-check-label"> Ambos </span>
              </label>
            </div>
          </div>
          <div className="row gx-3">
            <div className="col mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="form-text">
                Nunca compartiremos tu correo electrónico
              </small>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-3">
              <label className="form-label">Crear contraseña</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col mb-3">
              <label className="form-label">Repetir contraseña</label>
              <input
                className="form-control"
                type="password"
                name="repetirPassword"
                value={formData.repetirPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mt-3 mb-4 align-items-center">
            <div className="col-auto">
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse ahora"}
              </button>
            </div>
            <div className="col">
              <label className="form-check me-auto">
                <input className="form-check-input" type="checkbox" required />
                <span className="form-check-label">
                  Acepto los Términos y Condiciones
                </span>
              </label>
            </div>
          </div>
        </form>
        <hr />
        <p className="mb-0">
          ¿Ya tienes una cuenta? <a href="/signin">Inicia sesión</a>
        </p>
      </article>
    </div>
  );
}
