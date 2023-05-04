import { HashRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import "./index.css";

import Header from "./components/header/Header";
import MainPages from "./components/MainPages";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <DataProvider>
      <Router>
        <article className="App">
          <Header />
          <MainPages />
          <Footer />
        </article>
      </Router>
    </DataProvider>
  );
}

export default App;