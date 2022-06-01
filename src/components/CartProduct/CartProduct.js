import { Component } from "react";
import { connect } from "react-redux";
import Price from "../Price/Price";
import ProductImages from "../ProductImages/ProductImages";
import {
  increaseCartProductAmount,
  decreaseCartProductAmount,
  removeProductFromCart,
} from "../../redux/actions/cart";
import "./CartProduct.css";

class CartProduct extends Component {
  render() {
    return (
      <div className="cart-product">
        <div className="product-details">
          <h3 className="product-details__name">
            {this.props.product.product.name}
          </h3>
          <p className="product-details__brand">
            {this.props.product.product.brand}
          </p>
          <Price prices={this.props.product.product.prices} />
          <div className="product-attributes">
            {this.props.product.product.attributes.map((att) => (
              <div key={att.id} className="product-attributes__row">
                <p className="product-attributes__row-name">{att.name}:</p>
                <div className="product-attributes__row-values">
                  {att.items.map((item) => (
                    <button
                      disabled
                      className={`${att.type === "text" ? "box" : ""} ${
                        this.props.product.product.selectedAttributes[
                          att.name
                        ] === item.value
                          ? "active"
                          : ""
                      }`}
                      key={item.id}
                    >
                      {att.type === "swatch" && (
                        <div
                          className="attribute-swatch"
                          style={{
                            backgroundColor: item.value,
                            boxShadow: "0 0 10px rgba(0, 0, 0,0.1)",
                          }}
                        ></div>
                      )}

                      {att.type === "swatch" ? null : item.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="product-quantity">
          <button
            onClick={() =>
              this.props.increaseCartProductAmount(this.props.product.id)
            }
          >
            <img
              src="/images/plus-square-small.svg"
              alt="increase product amount"
            />
          </button>
          <p>{this.props.product.amount}</p>
          <button
            onClick={() => {
              if (this.props.product.amount === 1) {
                this.props.removeProductFromCart(this.props.product.id);
              } else {
                this.props.decreaseCartProductAmount(this.props.product.id);
              }
            }}
          >
            <img
              src="/images/minus-square-small.svg"
              alt="increase product amount"
            />
          </button>
        </div>
        <ProductImages images={this.props.product.product.gallery} />
      </div>
    );
  }
}

export default connect(null, {
  increaseCartProductAmount,
  decreaseCartProductAmount,
  removeProductFromCart,
})(CartProduct);
