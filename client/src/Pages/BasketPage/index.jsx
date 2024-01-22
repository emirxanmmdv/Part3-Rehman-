import React, { useContext } from "react";
import "./index.scss";
import { BasketContext } from "../../Context/BasketContext";

const BasketPage = () => {
  const { AddToBasket, RemoveFromBasket, increase, decrease, basket } =
    useContext(BasketContext);
  return (
    <div className="basket">
      <h1>
        {basket &&
          basket.map((item) => (
            <>
              <div className="img">
                <img src={item.image} />
              </div>
              <div className="name">
                <h1>{item.name}</h1>
              </div>
              <div className="desc">
                <p>{item.description}</p>
              </div>
              <div className="price">
                <span>${item.price}</span>
              </div>
              <div className="count">
                <button onClick={() => decrease(item)}>-</button>
                <span>{item.count}</span>
                <button onClick={() => increase(item)}>+</button>
              </div>
              
              <div className="total">total : {item.count * item.price}</div>
              <button onClick={() => RemoveFromBasket(item)}>
                Remove from Basket
              </button>
            </>
          ))}
          <div className="basketTotal">
            total order : {
                basket.reduce((total,currentElement)=>(total+(currentElement.price * currentElement.count)),0) 
            }
          </div>
      </h1>
    </div>
  );
};

export default BasketPage;
