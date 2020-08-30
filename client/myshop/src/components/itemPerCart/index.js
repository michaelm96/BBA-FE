import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol } from "mdbreact";

function ItemPerCart({ cartItem, idx, updatePrice }) {
  const [amount, setAmount] = useState(cartItem.amount);
  const [maxAmount, setMAxAmount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/cart/${cartItem.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMAxAmount(data.amount);
      });
  }, []);

  const decrease = () => {
    if (amount - 1 > 0) {
      updatePrice(idx, amount-1);
      setAmount(amount - 1);
    }
  };

  const increase = () => {
    if (amount + 1 <= maxAmount) {
      updatePrice(idx, amount+1);
      setAmount(amount + 1);
    }
  };

  return (
    <>
      <MDBRow>
        <MDBCol>
          <img
            src={cartItem.imageUrl}
            style={{ width: "200px", height: "200px" }}
          />
        </MDBCol>
        <MDBCol>
          <MDBRow>
            <h2>{cartItem.name}</h2>
          </MDBRow>
          <MDBRow>
            <p>{cartItem.description}</p>
          </MDBRow>
          <MDBRow>
            <h5>
              Rp
              {cartItem.price
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
            </h5>
          </MDBRow>
        </MDBCol>
        <MDBCol>
          <div className="def-number-input number-input">
            <button onClick={() => decrease()} className="minus"></button>
            <input
              className="quantity"
              name="quantity"
              value={amount}
              onChange={(e) => {
                updatePrice(idx, e.target.value);
              }}
              max={maxAmount}
              type="number"
            />
            <button onClick={() => increase()} className="plus"></button>
          </div>
        </MDBCol>
        <hr style={{ border: "2px solid white", width: "55vw" }} />
      </MDBRow>
    </>
  );
}

export default ItemPerCart;
