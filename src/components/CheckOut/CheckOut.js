import React from "react";
import { useStateValue } from "../../context/StateProvider";
import CheckOutProduct from "../CheckOutProduct/CheckOutProduct";
import Subtotal from "../Subtotal/Subtotal";
import "./CheckOut.css";
import FlipMove from "react-flip-move";

function CheckOut() {
  const [{ basket, user }] = useStateValue();
  const ticketNotVisibleState = {
    transform: "translateX(-100%)",
    opacity: 0.1,
  };
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout_ad"
        />
        <div>
          <h3>Hello,{user?.email}</h3>
          <h2 className="checkout_title">Your Shopping Basket</h2>

          {basket.length === 0 && (
            <div className="checkout_main">
              <img
                className="checkout_image"
                src="https://www.svgrepo.com/show/17356/empty-cart.svg"
                alt="checkout"
              />
              <h3 className="checkout__emptyCart">Your cart is empty</h3>
            </div>
          )}

          <FlipMove
            enterAnimation={{
              from: ticketNotVisibleState,
              to: {},
            }}
            leaveAnimation={{
              from: {},
              to: ticketNotVisibleState,
            }}
          >
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
          </FlipMove>
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default CheckOut;
