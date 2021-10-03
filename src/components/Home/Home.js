import React from "react";
import Products from "../Products/Products";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg"
          alt=""
        />
        <div className="home_row">
          <Products
            id="23456"
            title="WD 4 TB Elements Portable External Hard Drive - USB 3.0, Black"
            price={190.99}
            image="https://images-na.ssl-images-amazon.com/images/I/717mmm0oqnL._AC_SL1500_.jpg"
            rating={5}
          />
          <Products
            id="12345"
            title="Scoreboards - Dart Scorer - Electronic Scoring System - Dartsmate Elite"
            price={222.99}
            image="https://m.media-amazon.com/images/I/41MHtz+Dv2L._AC_UL320_.jpg"
            rating={4}
          />
        </div>
        <div className="home_row">
          <Products
            id="12345"
            title="Scoreboards - Dart Scorer - Electronic Scoring System - Dartsmate Elite"
            price={222.99}
            image="https://m.media-amazon.com/images/I/41MHtz+Dv2L._AC_UL320_.jpg"
            rating={4}
          />
          <Products
            id="56789"
            title="TC Electronic Ditto Looper"
            price={7.99}
            image="https://m.media-amazon.com/images/I/61nRVhZ5vKL._AC_UL320_.jpg"
            rating={4}
          />
          <Products
            id="34567"
            title=" Electronic Component Starter Kit Breadboard"
            price={287.99}
            image="https://m.media-amazon.com/images/I/713NgnnUCeL._AC_UL320_.jpg"
            rating={3}
          />
        </div>
        <div className="home_row">
          <Products
            id="111213"
            title="TC Electronic SPARK BOOSTER"
            price={199.99}
            image="https://m.media-amazon.com/images/I/51weZKk6GrL._AC_UL320_.jpg"
            rating={4}
          />
          <Products
            id="56789"
            title="TC Electronic Ditto Looper"
            price={7.99}
            image="https://m.media-amazon.com/images/I/61nRVhZ5vKL._AC_UL320_.jpg"
            rating={4}
          />
        </div>
        <div className="home_row">
          <Products
            id="78910"
            title="Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED Computer Monitor, 3840 x 1080p Resolution, 1ms Response, FreeSync 2 with HDR"
            price={899.29}
            image="https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_UY218_.jpg"
            rating={2}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
