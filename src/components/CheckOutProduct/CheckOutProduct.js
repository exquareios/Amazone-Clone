import React, { forwardRef } from "react";
import { useStateValue } from "../../context/StateProvider";
import "./CheckOutProduct.css";

const CheckOutProduct = forwardRef(
  ({ id, image, title, price, rating, hidebutton }, ref) => {
    const [{}, dispatch] = useStateValue();

    const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <div ref={ref} className="checkoutProduct">
        <img src={image} alt="product" className="checkoutProduct_image" />
        <div className="checkoutProduct_info">
          <p className="checkoutProduct_title">{title}</p>
          <p className="checkoutProduct_price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct_rating">
            {Array(rating)
              .fill()
              .map((i, index) => (
                <p key={index}>⭐</p>
              ))}
          </div>

          {!hidebutton && (
            <button onClick={removeFromBasket}>Remove from basket</button>
          )}
        </div>
      </div>
    );
  }
);
export default CheckOutProduct;
