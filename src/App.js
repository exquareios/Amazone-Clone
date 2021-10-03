import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckOut from "./components/CheckOut/CheckOut";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import { auth } from "./firebase";
import { useStateValue } from "./context/StateProvider";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders/Orders";
import Register from "./components/Register/Register";

const promise = loadStripe(
  "pk_test_51IBduPDscz3Ticv22AGgMgBxE7mKzlqgw7ZmryIboKSgAghjloKuTxR4xXAaTxmVMNyxJMfqMzUmcZVsIe6xQiCf00ifSdJ2UC"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //run once when the component loads
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App" id="app">
        <Switch>
          {/* login route */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Register route */}
          <Route path="/register">
            <Register />
          </Route>
          {/* checkout route */}
          <Route path="/checkout">
            <Header />
            <CheckOut />
            <BackToTop />
            <Footer />
          </Route>
          {/* payment route */}
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          {/* orders route */}
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          {/* home route/ Default route */}
          <Route path="/">
            <Header />
            <Home />
            <BackToTop />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
