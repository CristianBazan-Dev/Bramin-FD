import React from "react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import About from "./aboutPage/About";
import Expenses from "./expenses/Expenses";
import Requests from "./requests/Requests";
import Services from "./services/Services";
import Inventary from "./inventary/Inventary";


function Pages(props) {


  return (
    <main>
      <Routes>
        <Route path="/" element={<Requests/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/inventary" element={<Inventary/>} />
      </Routes>
    </main>
  );
}

export default Pages;
