/* eslint-disable array-callback-return */
import { createContext, useState } from "react";
import { getProductData } from "./productsStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

// CODE DOWN HERE - fucntions

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // [{id: 1 , quantity: 2} , {id: 2 , quantity: 1}] data fomrat

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      // if only one product is available in cart
      deleteFromCart(id); // remove it completely
    } else {
      // if more than one product is available in the cart
      setCartProducts(
        //change state of products
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 } // subtract the product count by one
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      // new array of products (after deletion of specific id product)
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id; // array of products that do not match with the given id
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  // wrapping all the context values into provider (provider wrapping)
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
