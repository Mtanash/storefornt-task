import {
  ADD_PRODUCT_TO_CART,
  DECREASE_CART_PRODUCT_AMOUNT,
  INCREASE_CART_PRODUCT_AMOUNT,
  REMOVE_PRODUCT_FROM_CART,
} from "../actionTypes";
import uniqueId from "../../utils/uniqueId";
import {
  getCartProductsFromLocalStorage,
  saveCartProductsToLocalStorage,
} from "../../utils/storage";

const initialState = {
  cartProducts: getCartProductsFromLocalStorage(),
};

const compareTwoObjects = (obj1, obj2) => {
  let result = true;
  const obj1Keys = Object.keys(obj1);
  for (let i = 0; i < obj1Keys.length; i++) {
    if (obj1[obj1Keys[i]] !== obj2[obj1Keys[i]]) {
      result = false;
      break;
    }
  }
  return result;
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const productMatch = state.cartProducts.find(
        (product) =>
          product.product.id === action.payload.product.id &&
          compareTwoObjects(
            product.product.selectedAttributes,
            action.payload.product.selectedAttributes
          )
      );
      if (productMatch) {
        const newState = {
          cartProducts: state.cartProducts.map((cartProduct) => {
            if (
              cartProduct.product.id === action.payload.product.id &&
              compareTwoObjects(
                cartProduct.product.selectedAttributes,
                action.payload.product.selectedAttributes
              )
            ) {
              return {
                ...cartProduct,
                product: cartProduct.product,
                amount: (cartProduct.amount += action.payload.amount),
              };
            } else {
              return cartProduct;
            }
          }),
        };
        saveCartProductsToLocalStorage(newState.cartProducts);
        return newState;
      } else {
        const newState = {
          cartProducts: [
            ...state.cartProducts,
            { id: uniqueId(), ...action.payload },
          ],
        };
        saveCartProductsToLocalStorage(newState.cartProducts);
        return newState;
      }

    case REMOVE_PRODUCT_FROM_CART:
      const newProducts = state.cartProducts.filter(
        (cartProduct) => cartProduct.id !== action.payload.id
      );
      saveCartProductsToLocalStorage(newProducts);
      return { cartProducts: newProducts };

    case INCREASE_CART_PRODUCT_AMOUNT:
      const newState = {
        cartProducts: state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, amount: (product.amount += 1) };
          } else {
            return product;
          }
        }),
      };
      saveCartProductsToLocalStorage(newState.cartProducts);
      return newState;

    case DECREASE_CART_PRODUCT_AMOUNT:
      const NState = {
        cartProducts: state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              amount: product.amount <= 1 ? 1 : product.amount - 1,
            };
          } else {
            return product;
          }
        }),
      };
      saveCartProductsToLocalStorage(NState.cartProducts);
      return NState;

    default:
      return state;
  }
};

export default cart;
