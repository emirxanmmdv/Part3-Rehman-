import React, { useContext } from "react";
import "./index.scss";
import { WishlistContext } from "../../Context/WishlistContext";

const WishlistPage = () => {
  const { toggleWishlist, wishlist } = useContext(WishlistContext);
  return (
    <div className="wishlist">
      <h1>
        {wishlist &&
          wishlist.map((item) => (
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
              <button onClick={()=>toggleWishlist(item)}>Remove from Wishlist</button>
            </>
          ))}
      </h1>
    </div>
  );
};

export default WishlistPage;
