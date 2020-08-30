import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./style.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
  let history = useHistory();
  

  useEffect(() => {
    if(localStorage.getItem('access_token')){
      history.push("/")
    }
  }, [])

  const submit = (e) => {
    e.preventDefault();
    let time = new Date().getTime();
    let newUser = {
      id: `u${time}`,
      name,
      email,
      password,
		}
    return fetch("http://localhost:3000/user", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
				history.push('/login')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateForm = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
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
            <p className="h2 text-center mb-4 white-text text">Register</p>
            <label
              htmlFor="defaultFormRegisterNameEx"
              className="white-text text"
            >
              Your name
            </label>
            <input
              name="name"
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              onChange={(e) => updateForm(e)}
            />
            <br />
            <label
              htmlFor="defaultFormRegisterEmailEx"
              className="white-text text"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              onChange={(e) => updateForm(e)}
            />
            <br />
            <label
              htmlFor="defaultFormRegisterPasswordEx"
              className="white-text text"
            >
              Your password
            </label>
            <input
              name="password"
              type="password"
              id="defaultFormRegisterPasswordEx"
              className="form-control"
              onChange={(e) => updateForm(e)}
            />
            <div className="text-center mt-4">
              <MDBBtn color="unique" type="submit">
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Register;
