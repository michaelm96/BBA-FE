import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./style.css";

const Similar = () => {
  const { id } = useParams();
  const history = useHistory();
  const [arr, setArr] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/`)
      .then((res) => res.json())
      .then((theItems) => {
        let tempArr = [];
        let notId = theItems.filter((item) => item.id != id);
        while (tempArr.length < 3) {
          let popId = Math.round(Math.random() * (notId.length - 1));
          tempArr.push(notId[popId]);
          notId.splice(popId, 1);
        }
        setArr(tempArr);
      });
  }, [id]);

  return (
    <>
      <section className="text-center my-5">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Other Products
        </h2>
        <div className="divArr">
          {arr &&
            arr.map((product, idx) => {
              return (
                <Link to={`/detail/${product.id}`} key={idx} >
                  <figure className="Img deep-blue-gradient">
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
                  </figure>
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Similar;
