import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartProductsCount,
  getCartProductsTotalCost,
} from "../../redux/selectors";
import CartProduct from "../CartProduct/CartProduct";
import "./CartButton.css";

class CartButton extends Component {
  constructor(props) {
    super(props);

    this.cartButtonRef = React.createRef();
    this.cartMenuRef = React.createRef();

    this.state = {
      cartMenuIsOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickAway);
  }

  handleClickAway = (e) => {
    if (
      !this.cartButtonRef.current.contains(e.target) &&
      !this.cartMenuRef.current.contains(e.target)
    ) {
      this.closeCartMenu();
    }
  };

  toggleCartMenu = () => {
    this.setState({ cartMenuIsOpen: !this.state.cartMenuIsOpen });
    document.body.style.overflow = !this.state.cartMenuIsOpen
      ? "hidden"
      : "auto";
  };

  closeCartMenu = () => {
    this.setState({ cartMenuIsOpen: false });
    document.body.style.overflow = "auto";
  };

  render() {
    return (
      <>
        <button className="cart-button" ref={this.cartButtonRef}>
          <div onClick={this.toggleCartMenu}>
            <img src="/images/empty-cart.svg" alt="cart" className="icon" />
            {this.props.cartProductsCount > 0 && (
              <span className="icon cart-button__badge">
                {this.props.cartProductsCount}
              </span>
            )}
          </div>
        </button>
        <div
          className={`cart-button__overlay ${
            !this.state.cartMenuIsOpen && "hidden"
          }`}
        >
          <div className="cart-button__menu" ref={this.cartMenuRef}>
            <div className="menu__header">
              <p>
                My Bag, <span>{this.props.cartProductsCount} items</span>
              </p>
            </div>
            <div className="menu__products">
              {this.props.cartProducts.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>
            <div className="menu__total">
              <p>Total</p>
              <p>
                {this.props.currentCurrencySymbol}
                {this.props.cartProductsTotalCost}
              </p>
            </div>
            <div className="menu__buttons">
              <Link
                onClick={this.closeCartMenu}
                className="bag-button"
                to="./cart"
              >
                view bag
              </Link>
              <Link className="checkout-button" to="./cart">
                checkout
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
  cartProductsCount: getCartProductsCount(state),
  cartProductsTotalCost: getCartProductsTotalCost(state),
  currentCurrencySymbol: state.currency.symbol,
});

export default connect(mapStateToProps)(CartButton);
