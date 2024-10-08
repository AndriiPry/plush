import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const {user} = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51NztUGI5wN08BpPAPPMVyfcmsq6zAlnRL1KncNG3xCQ6sF2xgb1dn8Cr6LlyUibOYy8arHBIjPsUfl6MJrIVXB460056zrSBBA"
  );
  const handlePayment = async () => {
    try {
      if(!user.isLoggedIn) {
        navigate('/loginPage')
      }
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        data : {
          products,
          user : user?.data?.user?.id
        }
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_IMAGE_ACCESS_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
