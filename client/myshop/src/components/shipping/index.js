import React, { useEffect, useState, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

function Shipping({ next, previous }) {
  const [provinces, setProvinces] = useState(null);
  const [city, setCity] = useState(null);
  const [cityInput, setCityInput] = useState(true);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const id = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://localhost:3000/province")
      .then((res) => res.json())
      .then((allProvinces) => {
        setProvinces(allProvinces);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/cart?userId=${id}`)
      .then((res) => res.json())
      .then((itemsCart) => {
        setItems(itemsCart);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (items != 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let price = items.map((item) => {
        return item.price * item.amount;
      });
      let finalPrice = price.reduce(reducer);
      setAmount(finalPrice);
    }
  });

  const handleChange = (e) => {
    fetch(`http://localhost:3000/city?province_id=${e.target.value}`)
      .then((res) => res.json())
      .then((selectedCity) => {
        setCity(selectedCity);
        setCityInput(false);
      });
  };

  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="8">
            <h1
              style={{
                textAlign: "start",
                marginBottom: "3rem",
                overflow: "auto",
              }}
            >
              Shipping Details
            </h1>
            <MDBRow
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "space-evenly",
                justifyContent: "space-evenly",
                margin: "5vh",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "25vw" }}
                placeholder="First Name"
              ></input>
              <input
                type="text"
                className="form-control"
                style={{ width: "25vw" }}
                placeholder="Last Name"
              ></input>
            </MDBRow>
            <MDBRow
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "space-evenly",
                justifyContent: "space-evenly",
                margin: "5vh",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "50.5vw" }}
                placeholder="Address"
              ></input>
            </MDBRow>
            <MDBRow
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "space-evenly",
                justifyContent: "space-evenly",
                margin: "5vh",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "50.5vw" }}
                placeholder="Address 2"
              ></input>
            </MDBRow>
            <MDBRow
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "space-evenly",
                justifyContent: "space-evenly",
                margin: "5vh",
              }}
            >
              <select
                className="browser-default custom-select"
                style={{ width: "25vw" }}
                onChange={(e) => handleChange(e)}
              >
                <option>Choose your province</option>
                {provinces &&
                  provinces.map((province, idx) => {
                    return (
                      <option key={idx} value={province.province_id}>
                        {province.province}
                      </option>
                    );
                  })}
              </select>
              <select
                className="browser-default custom-select"
                style={{ width: "25vw" }}
                disabled={cityInput}
              >
                <option>Choose your city</option>
                {city &&
                  city.map((kota, idx) => {
                    return (
                      <option key={idx} value={kota.city_id}>
                        {kota.city_name}
                      </option>
                    );
                  })}
              </select>
            </MDBRow>
            <MDBRow
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "space-evenly",
                justifyContent: "space-evenly",
                margin: "5vh",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "25vw" }}
                placeholder="Zip"
              ></input>
              <input
                type="text"
                className="form-control"
                style={{ width: "25vw" }}
                placeholder="Postal Code"
              ></input>
            </MDBRow>
            <MDBRow>
              <MDBCol
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "space-evenly",
                  justifyContent: "space-evenly",
                  margin: "5vh",
                }}
              >
                <div
                  style={{
                    border: "3px solid white",
                    width: "20vw",
                    height: "20vh",
                    padding: "2rem",
                  }}
                >
                  <input
                    label="Free Shipping"
                    type="radio"
                    id="radio1"
                    name="shipping"
                    style={{
                      display: "inline-flex",
                    }}
                  />
                  <h3 className="text-truncate">Free Shipping</h3>
                  <p>Rp 0</p>
                </div>
                <div
                  style={{
                    border: "3px solid white",
                    width: "20vw",
                    height: "20vh",
                    padding: "2rem",
                  }}
                >
                  <input
                    label="Next Day"
                    type="radio"
                    id="radio2"
                    name="shipping"
                    style={{ display: "inline-flex" }}
                  />
                  <h3 className="text-truncate">Next Day</h3>
                  <p>Rp 500.000</p>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="4">
            <MDBRow>
              <h1 style={{ textAlign: "start", margin: "0.5rem" }}>Summary</h1>
              <hr style={{ border: "2px solid transparent", width: "50vw" }} />
            </MDBRow>
            <MDBRow
              style={{ maxHeight: "30vh", maxWidth: "29vw", overflow: "auto" }}
            >
              {items &&
                items.map((item, idx) => {
                  return (
                    <MDBRow>
                      <MDBCol>
                        <img
                          src={item.imageUrl}
                          style={{ height: "10vh", width: "10vw" }}
                        />
                      </MDBCol>
                      <MDBCol>
                        <MDBRow>
                          <h5>{item.name}</h5>
                        </MDBRow>
                        <MDBRow>
                          <h5>
                            Rp {item.price} x {item.amount}
                          </h5>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                  );
                })}
            </MDBRow>
            <span style={{ margin: "5rem" }}></span>
            <MDBRow
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "3rem",
              }}
            >
              <MDBRow>
                <h3>Total</h3>
              </MDBRow>
              <MDBRow>
                <h4>
                  Rp{" "}
                  {amount &&
                    (amount + amount / 10)
                      .toFixed(0)
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </h4>
              </MDBRow>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Fragment>
        <MDBBtn outline color="grey" onClick={() => previous()} style={{}}>
          Cancel
        </MDBBtn>
        <MDBBtn outline color="primary" onClick={() => next()} style={{}}>
          Next
        </MDBBtn>
      </Fragment>
    </>
  );
}

export default Shipping;
