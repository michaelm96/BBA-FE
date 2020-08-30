import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Step } from "semantic-ui-react";
import CartDetail from "../../components/cartDetail.js";
import Shipping from "../../components/shipping/index.js";

const steps = [
  {
    key: "cart",
    icon: "cart",
    active: true,
    title: "Cart",
    description: "Checkout your item",
  },
  {
    key: "billing",
    active: false,
    icon: "shipping",
    title: "Shipping",
    description: "Enter Shipping information",
    disabled: true,
  },
  {
    key: "confirm",
    active: false,
    disabled: true,
    icon: "info",
    title: "Confirm Order",
  },
];

const Cart = () => {
  // const [steps, setSteps] = useState()
  const [idx, setIdx] = useState(0);
  const [access_token, setAccessToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      history.push("/login");
    } else {
      setAccessToken(localStorage.getItem("access_token"));
    }
  }, []);

  const nextStep = () => {
    if (idx < 3) {
      steps[idx].active = false;
      if (steps[idx + 1].disabled) {
        steps[idx + 1].disabled = false;
      }
      steps[idx + 1].active = true;
      setIdx(idx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (idx > 0) {
      steps[idx].active = false;
      if (!steps[idx].disabled) {
        steps[idx].disabled = true;
      }
      steps[idx - 1].active = true;
      setIdx(idx - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <>
      {access_token && (
        <>
          <Step.Group items={steps} />
          {steps[0].active ? <CartDetail next={nextStep} /> : null}
          {steps[1].active ? (
            <Shipping next={nextStep} previous={previousStep} />
          ) : null}
          {steps[2].active ? <h1>Congratulation your item(s) is on the way</h1> : null}
        </>
      )}
    </>
  );
};

export default Cart;
