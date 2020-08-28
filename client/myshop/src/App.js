import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./views/home";
import Navbar from "./components/navbar";
import DetailProduct from "./views/detailProduct";
import FooterPage from "./components/footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/detail/:id"}>
            <DetailProduct />
          </Route>
        </Switch>
        <FooterPage />
      </Router>
    </div>
  );
}

export default App;
