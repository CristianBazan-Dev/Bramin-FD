import React from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import About from "./aboutPage/About";
import Expenses from "./expenses/Expenses";
import Requests from "./requests/Requests";
import Services from "./services/Services";
import Inventory from "./inventory/Inventory";


function Pages(props) {


  return (
    <main>
      <Routes>
        <Route path="/" element={<Requests/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/inventory" element={<Inventory/>} />
      </Routes>
    </main>
  );
}

export default Pages;
