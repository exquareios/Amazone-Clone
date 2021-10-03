import React from "react";
import moment from "moment";
import "./Order.css";
import CheckOutProduct from "../CheckOutProduct/CheckOutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2 className="order_p">Order</h2>
      <p className="order_time">
        {moment.unix(order?.data.created).format("MMMM Do YYYY, h:mm a")}
      </p>
      <p className="order_id">
        <small>{order?.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckOutProduct
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
          hidebutton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order_total">Order Total : {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order?.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
