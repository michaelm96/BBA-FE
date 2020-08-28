import React, { useEffect, useState } from "react";
import "./style.css";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((product) => {
        setProducts(product);
        console.log(product);
      });
  }, []);

  console.log(products);

  return (
    <div>
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our bestsellers
      </h2>
      <p className="grey-text text-center w-responsive mx-auto mb-5"></p>
      <div className="styleList" mdb-lightbox>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
        amet numquam iure provident voluptate esse quasi, veritatis totam
        voluptas nostrum quisquam eum porro a pariatur veniam.
        {products &&
          products.map((product, idx) => {
            return (
              <figure className="Img deep-blue-gradient" key={idx}>
                <img
                  src={product.imageUrl}
                  className="img-fluid z-depth-1 imgList"
                  alt={product.name}
                  zoom
                />
                <h2 className="align">{product.name}</h2>
                <figcaption className="align desc">
                  {product.description}
                </figcaption>
                <figcaption className="align desc">
                  Rp{" "}
                  {product.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </figcaption>
                <Link to={`/detail/${product.id}`} className="brand">
                  <MDBBtn gradient="aqua" style={{ color: "grey" }}>
                    Detail
                  </MDBBtn>
                </Link>
              </figure>
            );
          })}
      </div>
    </div>
  );
};

export default ListProducts;
