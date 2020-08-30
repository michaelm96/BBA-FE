import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../register/style.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.push("/");
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/user?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data == 0) {
          alert("You Aren't Registered Yet");
        } else if (data) {
          if (data[0].password === password) {
            localStorage.setItem("access_token", data[0].id);
            history.push("/");
            window.location.reload(false);
          } else {
            alert("Invalid Email/Password");
            setEmail("");
            setPassword("");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const updateForm = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="bor">
      <MDBRow>
        <MDBCol md="12">
          <form onSubmit={(e) => submit(e)}>
            <p className="h2 text-center mb-4 white-text text">Log In</p>
            <br />
            <label
              htmlFor="defaultFormRegisterEmailEx"
              className="white-text text"
            >
              Your email
            </label>
            <input
              type="email"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              name="email"
              onChange={(e) => updateForm(e)}
              value={email}
            />
            <br />
            <label
              htmlFor="defaultFormRegisterPasswordEx"
              className="white-text text"
            >
              Your password
            </label>
            <input
              type="password"
              id="defaultFormRegisterPasswordEx"
              className="form-control"
              name="password"
              onChange={(e) => updateForm(e)}
              value={password}
            />
            <div className="text-center mt-4">
              <MDBBtn color="unique" type="submit">
                Login
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Register;
