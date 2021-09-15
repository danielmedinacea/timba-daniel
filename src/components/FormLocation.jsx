import React, { useEffect, useState } from "react";
import axios from "axios";

const FormLocation = ({ token, localizacion }) => {
  const [nombreLocalizacion, setNombreLocalizacion] = useState("");
  const [errorModificar, setErrorModificar] = useState(false);

  const modificarLocalizacion = async (e) => {
    e.preventDefault();
    setErrorModificar(false);
    if (nombreLocalizacion === "") {
      setErrorModificar(true);
      return;
    }

    await axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}timba/localizacion/${localizacion._id}`,
        {
          name: nombreLocalizacion,
        },
        {
          headers: {
            Authorization: "Bearer " + token, // En los headers van 'Bearer ' + token recibido
          },
        }
      )
      .then((response) => {
        console.log("Todo correcto", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="login-form">
      {localizacion ? (
        <form action="" onSubmit={modificarLocalizacion}>
          <h2 className="text-center">Modificar Localizacion</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre Localizacion"
              value={nombreLocalizacion}
              onChange={(e) => setNombreLocalizacion(e.target.value)}
            />
          </div>
          <div className="form-group d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-danger btn-block mt-4"
              value="Modificar"
            />
          </div>
          {errorModificar ? (
            <div
              className="alert alert-danger mt-4 col-auto mx-auto"
              role="alert"
            >
              TIENES QUE RELLENAR TODOS LOS CAMPOS
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default FormLocation;
