import React, { useEffect, useState } from "react";
import axios from "axios";
import FormLocation from "./FormLocation";

const Localizacion = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [localizaciones, setLocalizaciones] = useState([]);
  useEffect(async () => {
    setLoading(true);
    try {
      const respuesta = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}timba/localizacion`
      );
      setLocalizaciones(respuesta.data.localizations);
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const [locationSelect, setLocationSelect] = useState();

  const changeSelect = (e) => {
    const localizacionName = localizaciones.find((element) => {
      return element._id === e.target.value;
    });
    setLocationSelect(localizacionName);
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div>Cargando</div>
      ) : (
        <div className="row mt-4 justify-content-between">
          <div className="col-4">
            <select name="locations" onChange={changeSelect}>
              <option></option>
              {localizaciones.map((localizacion) => {
                return (
                  <option value={localizacion._id} key={localizacion._id}>
                    {localizacion.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-5">
            <FormLocation localizacion={locationSelect} token={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Localizacion;
