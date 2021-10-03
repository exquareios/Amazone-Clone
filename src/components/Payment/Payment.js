import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import { db } from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import CheckOutProduct from "../CheckOutProduct/CheckOutProduct";
import "./Payment.css";

function Payment() {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const getBasketTotal = (basket) => {
    return basket?.reduce((sum, item) => sum + item.price, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardElementOptions = {
    style: {
      base: {
        fontsize: "16px",
        color: "#000",
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        color: "#FFc7ee",
        iconColor: "#FFc7ee",
      },
    },
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_left">
          <div className="payment_left_title">
            <h3>
              Review Items and Delivery | <span>{basket?.length} items</span>
            </h3>
          </div>
          <div className="payment_items">
            {basket?.map((item, index) => (
              <CheckOutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment_right">
          {user !== null && (
            <div className="payment_right_top">
              <div className="payment_right_title">
                <h3>Delivery Address</h3>
              </div>
              <div className="payment_right_address">
                <p>{user?.email}</p>
                <p>
                  Street: <strong>123 React Lane</strong>
                </p>
                <p>
                  State: <strong>Los Angeles,CA </strong>
                </p>
              </div>
            </div>
          )}

          <div className="payment_right_bottom">
            <div className="payment_right_title">
              <h3>Payment Methods</h3>
            </div>

            <div className="payment_details">
              <form onSubmit={handleSubmit}>
                <CardElement
                  className="payment_card"
                  onChange={handleChange}
                  options={cardElementOptions}
                />
                <div className="payment_priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order Total: {value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    className="payment_button"
                    disabled={processing || disabled || succeeded}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
