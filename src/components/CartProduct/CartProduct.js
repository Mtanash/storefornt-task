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
    const {
      id: productId,
      product: { name, brand, prices, attributes, selectedAttributes, gallery },
      amount,
    } = this.props.product;

    const {
      increaseCartProductAmount,
      removeProductFromCart,
      decreaseCartProductAmount,
    } = this.props;

    return (
      <div className="cart-product">
        <div className="product-details">
          <h3 className="product-details__name">{name}</h3>
          <p className="product-details__brand">{brand}</p>
          <Price prices={prices} />
          <div className="product-attributes">
            {attributes.map((att) => (
              <div key={att.id} className="product-attributes__row">
                <p className="product-attributes__row-name">{att.name}:</p>
                <div className="product-attributes__row-values">
                  {att.items.map((item) => (
                    <button
                      disabled
                      className={`${att.type === "text" ? "box" : ""} ${
                        selectedAttributes[att.name] === item.value
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
          <button onClick={() => increaseCartProductAmount(productId)}>
            <img
              src="/images/plus-square-small.svg"
              alt="increase product amount"
            />
          </button>
          <p>{amount}</p>
          <button
            onClick={() => {
              if (amount === 1) {
                removeProductFromCart(productId);
              } else {
                decreaseCartProductAmount(productId);
              }
            }}
          >
            <img
              src="/images/minus-square-small.svg"
              alt="increase product amount"
            />
          </button>
        </div>
        <ProductImages images={gallery} />
      </div>
    );
  }
}

export default connect(null, {
  increaseCartProductAmount,
  decreaseCartProductAmount,
  removeProductFromCart,
})(CartProduct);
