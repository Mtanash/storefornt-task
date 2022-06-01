export const getCartProductsCount = (store) => {
  let amount = 0;
  store.cart.cartProducts.forEach((product) => {
    amount += product.amount;
  });
  return amount;
};

export const getCartProductsTotalCost = (store) => {
  let total = 0;
  const currentCurrencyLabel = store.currency.label;
  store.cart.cartProducts.forEach((product) => {
    total +=
      product.product.prices.find(
        (prices) => prices.currency.label === currentCurrencyLabel
      ).amount * product.amount;
  });
  return total.toFixed(2);
};
