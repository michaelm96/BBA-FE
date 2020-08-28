import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdbreact";
import './style.css'

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:3000/products/`)
      .then((res) => res.json())
      .then((theItem) => {
        if(theItem.length < id){
          setErr(true)
          setLoading(false)
        }else{
          setItem(theItem[id-1])
          setLoading(false)
        }
      });
  }, []);

  const decrease = () => {
    setAmount(amount - 1);
  };

  const increase = () => {
    setAmount(amount + 1);
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {err && <h1>Product Not Found</h1>}
      {item && (
        <div className="parentDiv">
          <MDBContainer style={{ margin: "0px", padding: "0px" }}>
            <img
              src={item.imageUrl}
              style={{ height: "70vh", width: "100%", margin: "0px" }}
            />
          </MDBContainer>
          <MDBContainer style={{ margin: "0px", padding: "0px" }}>
            <h1
              style={{
                height: "max-content",
                width: "max-content",
                margin: "auto",
              }}
            >
              {item.name}
            </h1>
            <hr />
            <div
              style={{
                display: "inline-flex",
                marginTop: "2rem",
              }}
            >
              <h2
                style={{
                  height: "max-content",
                  width: "max-content",
                  margin: "0 10vh"
                }}
              >
                Rp {item.price
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              </h2>
              <div className="def-number-input number-input">
                <button onClick={() => decrease()} className="minus"></button>
                <input
                  className="quantity"
                  name="quantity"
                  value={amount}
                  onChange={() => console.log("change")}
                  type="number"
                />
                <button onClick={() => increase()} className="plus"></button>
              </div>
            </div>
            <hr />
            <div>
                <p>{item.description}</p>
            </div>
            <hr />
            <MDBBtn gradient="purple">Add To Cart <img src="https://img.icons8.com/nolan/64/shopping-cart.png"/></MDBBtn>
          </MDBContainer>
        </div>
      )}
    </>
  );
}

export default Detail;
