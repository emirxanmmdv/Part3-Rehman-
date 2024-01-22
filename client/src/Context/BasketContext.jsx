import React, { createContext, useEffect, useState } from "react";

export const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const AddToBasket = (product) => {
    const Index = basket.findIndex((item) => item._id === product._id);
    if (Index === -1) {
      product.count = 1;
      setBasket([...basket, product]);
    } else {
      basket[Index].count++;
      setBasket([...basket]);
    }
  };

  const RemoveFromBasket = (product) => {
    setBasket(basket.filter((item) => item._id !== product._id));
  };
  function increase(product) {
    const Index = basket.findIndex((item) => item._id === product._id);
    basket[Index].count++;
    setBasket([...basket]);
  }
  function decrease(product) {
    const Index = basket.findIndex((item) => item._id === product._id);
    if (basket[Index].count > 1) {
      basket[Index].count--;
      setBasket([...basket]);
      return
    }
  }
  const data = {
    AddToBasket,
    RemoveFromBasket,
    increase,
    decrease,
    basket,
  };
  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
};

export default BasketProvider;
