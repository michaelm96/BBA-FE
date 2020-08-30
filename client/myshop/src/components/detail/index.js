import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MDBContainer, MDBBtn } from "mdbreact";
import "./style.css";

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((theItem) => {
        if (!Object.keys(theItem).length) {
          setTimeout(() => {
            setErr(true);
            setLoading(false);
          }, 3000);
        } else {
          setItem(theItem);
          setLoading(false);
          setErr(false);
        }
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const decrease = () => {
    setAmount(amount - 1);
  };

  const increase = () => {
    setAmount(amount + 1);
  };

  const addToCart = () => {
    let time = new Date().getTime();
    let userId = localStorage.getItem("access_token");
    let sendItem = {
      id: `p${time}`,
      name: item.name,
      price: item.price,
      amount,
      description: item.description,
      weight: item.weight,
      imageUrl: item.imageUrl,
      productId: item.id,
      userId,
    };
    fetch(`http://localhost:3000/cart?userId=${userId}`)
      .then((res) => res.json())
      .then((cartUser) => {
        let check = false;
        for (let i = 0; i < cartUser.length; i++) {
          if (cartUser[i].productId == item.id) {
            console.log(cartUser[i].id);
            let newObj = {
              id: cartUser[i].id,
              name: cartUser[i].name,
              price: cartUser[i].price,
              amount: amount + cartUser[i].amount,
              description: cartUser[i].description,
              weight: cartUser[i].weight,
              imageUrl: cartUser[i].imageUrl,
              productId: cartUser[i].id,
              userId: cartUser[i].userId,
            };
            check = true;
            fetch(`http://localhost:3000/cart?id=${cartUser[i].id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newObj),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("success", data);
                history.push("/cart");
              })
              .catch((err) => console.log(err));
          }
        }
        if (!check) {
          fetch("http://localhost:3000/cart/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendItem),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              history.push("/cart");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {err && <h1>Product Not Found</h1>}
      {item && (
        <div className="parentDiv">
          <MDBContainer style={{ margin: "2rem", padding: "0px" }}>
            <img
              src={item.imageUrl}
              style={{ height: "70vh", width: "100%", margin: "0px" }}
            />
          </MDBContainer>
          <MDBContainer style={{ margin: "2rem", padding: "0px" }}>
            <h1
              style={{
                height: "max-content",
                width: "max-content",
                margin: "auto",
                fontFamily: "Rubik",
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
                  margin: "0 10vh",
                  fontFamily: "Rubik",
                }}
              >
                Rp{" "}
                {item.price
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              </h2>
              <div className="def-number-input number-input">
                <button onClick={() => decrease()} className="minus"></button>
                <input
                  className="quantity"
                  name="quantity"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                />
                <button onClick={() => increase()} className="plus"></button>
              </div>
            </div>
            <hr />
            <div>
              <p style={{ fontFamily: "Rubik" }}>{item.description}</p>
            </div>
            <hr />
            <MDBBtn gradient="purple" onClick={() => addToCart()}>
              Add To Cart{" "}
              <img src="https://img.icons8.com/nolan/64/shopping-cart.png" />
            </MDBBtn>
          </MDBContainer>
        </div>
      )}
    </>
  );
};

export default Detail;
