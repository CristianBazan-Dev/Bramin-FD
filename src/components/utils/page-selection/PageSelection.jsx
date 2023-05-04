import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function PageSelection(props) {
  const { pathname } = useLocation();

  return (
    <div className="pageSelection-page">
      <div className="tabs group">
        <li className={pathname === "/" ? "active" : ""}>
          {" "}
          <Link to="/" id="request-li" value="request-li">
            Pedidos
          </Link>{" "}
        </li>

        <li className={pathname === "/services" ? "active" : ""}>
          <Link to="/services" id="services-li">
            Servicios
          </Link>
        </li>

        <li className={pathname === "/expenses" ? "active" : ""}>
          <Link to="/expenses" id="expenses-li">
            Gastos
          </Link>{" "}
        </li>

        <li className={pathname === "/inventary" ? "active" : ""}>
          <Link to="/inventary" id="inventary-li">
            Inventario
          </Link>{" "}
        </li>
      </div>
    </div>
  );
}

export default PageSelection;
