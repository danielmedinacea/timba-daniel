import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Localizacion from "./components/Localizacion";

function App() {
  // const [datos, setDatos] = useState({});
  const [token, setToken] = useState();

  const gestionarAcceso = (dato) => {
    // setDatos(dato); // datos del usuario: email, password y token
    setToken(dato.token); // Por si fuera necesario
  };

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Auth gestionarAcceso={gestionarAcceso} />
        </Route>
        <Route path="/localizaciones">
          <Localizacion token={token} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
