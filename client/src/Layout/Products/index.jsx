import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { WishlistContext } from "../../Context/WishlistContext.jsx";
import { BasketContext } from "../../Context/BasketContext.jsx";

const Products = () => {
  const [product, setProduct] = useState("");
  async function axiosData() {
    const response = await axios.get("http://localhost:3100/products/");
    setProduct(response.data);
  }
  useEffect(() => {
    axiosData();
  }, []);
  const { toggleWishlist, wishlist } = useContext(WishlistContext);
  const { AddToBasket, RemoveFromBasket, increase, decrease, basket } =
    useContext(BasketContext);

  return (
    <section className="productCards">
      {product &&
        product.map((item) => (
          <div className="productCard">
            <div className="CardImg">
              <img src={item.image} />
            </div>
            <div className="cardName">
              <h1>{item.name}</h1>
            </div>
            <div className="cardDesc">
              <p>{item.description}</p>
            </div>
            <div className="cardPrice">
              <span>{item.price}</span>
            </div>
            <div className="addToWishList">
              <button onClick={() => toggleWishlist(item)}>
                Add to Wishlist
              </button>
            </div>
            <div className="addToBasket">
              <button onClick={()=>AddToBasket(item)}>Add to Basket</button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Products;
