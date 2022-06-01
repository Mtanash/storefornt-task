import {
  ADD_PRODUCT_TO_CART,
  DECREASE_CART_PRODUCT_AMOUNT,
  INCREASE_CART_PRODUCT_AMOUNT,
  REMOVE_PRODUCT_FROM_CART,
} from "../actionTypes";

export const addProductToCart = (product, amount) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, amount },
});

export const removeProductFromCart = (id) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: { id },
});

export const increaseCartProductAmount = (id) => ({
  type: INCREASE_CART_PRODUCT_AMOUNT,
  payload: { id },
});

export const decreaseCartProductAmount = (id) => ({
  type: DECREASE_CART_PRODUCT_AMOUNT,
  payload: { id },
});
