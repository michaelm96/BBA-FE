import React from "react";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import Home from "./views/home";
import Navbar from "./components/navbar";
import DetailProduct from "./views/detailProduct";
import Login from "./views/login";
import Register from "./views/register";
import HorizontalLinearStepper from "./views/cart";
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
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/register"}>
            <Register />
          </Route>
          <Route exact path={"/cart"}>
            <HorizontalLinearStepper />
          </Route>
        </Switch>
        <FooterPage />
      </Router>
    </div>
  );
}

export default App;
