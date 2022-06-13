import { Component } from "react";
import { connect } from "react-redux";
import {
  getCartProductsCount,
  getCartProductsTotalCost,
} from "../../redux/selectors";
import CartProduct from "../CartProduct/CartProduct";
import "./CartPage.css";

class CartPage extends Component {
  render() {
    const { cartProducts, currentCurrencySymbol, cartProductsTotalCost } =
      this.props;

    return (
      <section className="cart-page full-height">
        <div className="container">
          <h2 className="cart-page__title">Cart</h2>
          <div className="cart-page__products">
            {cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <div className="cart-page__total">
            <div className="tax">
              <p>Tax 21%:</p>
              <p>
                {currentCurrencySymbol}
                {((cartProductsTotalCost * 21) / 100).toFixed(2)}
              </p>
            </div>
            <div className="quantity">
              <p>Quantity:</p>
              <p>{this.props.cartProductsCount}</p>
            </div>
            <div className="total">
              <p>Total:</p>
              <p>
                {currentCurrencySymbol}
                {cartProductsTotalCost}
              </p>
            </div>
            <button className="cart-page__total-button">order</button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
  cartProductsCount: getCartProductsCount(state),
  cartProductsTotalCost: getCartProductsTotalCost(state),
  currentCurrencySymbol: state.currency.symbol,
});

export default connect(mapStateToProps)(CartPage);
