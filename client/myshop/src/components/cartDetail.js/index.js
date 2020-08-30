import React, { useEffect, useState, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./style.css";
import ItemPerCart from "../itemPerCart";

const CartDetail = ({ next }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const id = localStorage.getItem("access_token")

  useEffect(() => {
    fetch(`http://localhost:3000/cart?userId=${id}`)
      .then((res) => res.json())
      .then((carts) => {
        setCart(carts);
      });
  }, []);

  useEffect(() => {
    if (cart != 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let price = cart.map((itemCart) => {
        return itemCart.price * itemCart.amount;
      });
      let finalPrice = price.reduce(reducer);
      setAmount(finalPrice);
    }
  }, [cart]);

  const updatePrice = (idx, amount1) => {
    let newObj = cart[idx];
    newObj.amount = amount1;
    setCart(
      cart.map((item, id) => {
        return idx === id ? newObj : item;
      })
    );
  };

  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="8" style={{ padding: "3rem", margin: "0 auto" }}>
            <h1 style={{ textAlign: "start", marginBottom: "3rem" }}>
              Shopping Cart
            </h1>
            <MDBRow>
              {cart &&
                cart.map((cartItem, idx) => {
                  return (
                    <ItemPerCart
                      cartItem={cartItem}
                      updatePrice={updatePrice}
                      idx={idx}
                      key={idx}
                    ></ItemPerCart>
                  );
                })}
            </MDBRow>
          </MDBCol>
          <MDBCol md="4">
            <MDBRow>
              <h1 style={{ textAlign: "start", margin: "2rem" }}>Summary</h1>
              <hr style={{ border: "2px solid transparent", width: "50vw" }} />
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <h3>Subtotal</h3>
              </MDBCol>
              <MDBCol>
                <h4>
                  Rp{" "}
                  {amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </h4>
              </MDBCol>
            </MDBRow>
            <br />
            <MDBRow>
              <MDBCol>
                <h3>Taxes</h3>
              </MDBCol>
              <MDBCol>
                <h4>
                  Rp{" "}
                  {(amount / 10)
                    .toFixed(0)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </h4>
                <hr style={{ marginBottom: "5rem" }} />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <h3>Total</h3>
              </MDBCol>
              <MDBCol>
                <h4>
                  Rp{" "}
                  {(amount + amount / 10)
                    .toFixed(0)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </h4>
                <span style={{ marginBottom: "5rem" }}></span>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Fragment>
        <MDBBtn
          outline
          color="primary"
          onClick={() => next()}
          style={{ }}
        >
          Next
        </MDBBtn>
      </Fragment>
    </>
  );
};

export default CartDetail;
