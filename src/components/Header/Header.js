import React from "react";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) auth.signOut();
  };

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="logo"
            className="header_logo"
          />
        </Link>
        <div className="header_search">
          <input className="header_searchInput" type="text" />
          <SearchIcon className="header_searchIcon" />
        </div>
        <div className="header_nav">
          <Link to={!user && "./Login"}>
            <div onClick={handleAuthentication} className="header_option">
              <span className="header_optionLineOne">
                Hello {!user ? "Guests" : user.email}
              </span>
              <span className="header_optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header_option">
              <span className="header_optionLineOne">Returns</span>
              <span className="header_optionLineTwo">& Orders</span>
            </div>
          </Link>
          <div className="header_option">
            <span className="header_optionLineOne">Your</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header_optionBasket">
              <ShoppingCartIcon />
              <span className="header_optionLineTwo header_basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="header_two">
        <LocationOnOutlinedIcon className="header2_locationIcon" />

        <div className="header2_nav">
          <div className="header2_option">
            <span className="header2_optionOne">Deliver to</span>
            <span className="header2_optionTwo">Nigeria</span>
          </div>

          <div className="header2_option_one">
            <span className="header2_option_one_two">Today's Deals</span>
            <span className="header2_option_one_two">Customer Service</span>
            <span className="header2_option_one_two">Gift Cards</span>
            <span className="header2_option_one_two">Registry</span>
            <span className="header2_option_one_two">Sell</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
