import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import Order from "../Order/Order";
import "./Orders.css";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <div className="orders_container">
        <div className="orders_title">
          <h1>Your Orders</h1>
        </div>

        <div className="orders_order">
          {orders.length === 0 && (
            <div className="checkout_main">
              <img
                className="checkout_image"
                src="https://www.svgrepo.com/show/17356/empty-cart.svg"
                alt="checkout_image"
              />
              <h3 className="checkout_emptyCart">You have no orders</h3>
            </div>
          )}

          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
