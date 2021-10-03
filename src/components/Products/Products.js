import React from "react";
// import { useHistory } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import "./Products.css";

function Products({ index, id, title, price, image, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    const index = basket.length;
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        index: index,
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="products">
      <div className="products_info">
        <p>{title}</p>
        <p className="products_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="products_rating">
          {Array(rating)
            .fill()
            .map((i, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt={title} />
      <button onClick={addToBasket}>Add to cart</button>
    </div>
  );
}

export default Products;
