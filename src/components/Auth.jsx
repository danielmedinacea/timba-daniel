import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
const Auth = ({ gestionarAcceso }) => {
  const [estadoForm, setEstadoForm] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [usernameRegistro, setUsernameRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [registroError, setRegistroError] = useState(false);

  const cambiarForm = () => {
    setEstadoForm(!estadoForm);
    setUsername("");
    setPassword("");
    setUsernameRegistro("");
    setPasswordRegistro("");
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    setRegistroError(false);
    if (usernameRegistro === "" || passwordRegistro === "") {
      setRegistroError(true);
      return;
    }
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "timba/user", {
        name: usernameRegistro,
        password: passwordRegistro,
      })
      .then((response) => {
        console.log("Usuario creado");
        gestionarAcceso(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };

  const loginUsuario = async (e) => {
    e.preventDefault();
    setLoginError(false);
    if (username === "" || password === "") {
      setLoginError(true);
      return;
    }
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "timba/user/login", {
        name: username,
        password: password,
      })
      .then((response) => {
        console.log("Usuario Logeado");
        gestionarAcceso(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };

  return (
    <div className="container">
      {estadoForm ? (
        <div className="login-form">
          <form action="" onSubmit={loginUsuario}>
            <h2 className="text-center">Inicio Sesion</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value="Iniciar Sesion"
              />
              <button
                type="button"
                className="btn btn-warning btn-block mt-4"
                onClick={cambiarForm}
              >
                Cambiar
              </button>
            </div>
            {loginError ? (
              <div
                className="alert alert-danger mt-4 col-auto mx-auto"
                role="alert"
              >
                TIENES QUE RELLENAR TODOS LOS CAMPOS
              </div>
            ) : null}
          </form>
        </div>
      ) : (
        <div className="login-form">
          <form action="" onSubmit={crearUsuario}>
            <h2 className="text-center">Registro</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Usuario"
                value={usernameRegistro}
                onChange={(e) => setUsernameRegistro(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                value={passwordRegistro}
                onChange={(e) => setPasswordRegistro(e.target.value)}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                value="Registrarse"
              />
              <button
                type="button"
                className="btn btn-warning btn-block mt-4"
                onClick={cambiarForm}
              >
                Cambiar
              </button>
            </div>
            {registroError ? (
              <div
                className="alert alert-danger mt-4 col-auto mx-auto"
                role="alert"
              >
                TIENES QUE RELLENAR TODOS LOS CAMPOS
              </div>
            ) : null}
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
