import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="navbar navbar-dark">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/localizaciones">
              Localizaciones
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
