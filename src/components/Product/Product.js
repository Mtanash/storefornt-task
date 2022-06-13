import { Component } from "react";
import { Link } from "react-router-dom";
import Price from "../Price/Price";
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/actions/cart";
import "./Product.css";

class Product extends Component {
  handleAddToCartButtonClick = () => {
    const { id, name, brand, gallery, prices, attributes } = this.props.product;
    const selectedAttributes = {};
    attributes.forEach((att) => {
      selectedAttributes[att.name] = att.items[0].value;
    });
    this.props.addProductToCart(
      { name, id, gallery, prices, brand, attributes, selectedAttributes },
      1
    );
  };

  render() {
    const { inStock, id, gallery, name, brand, prices } = this.props.product;

    return (
      <div className={`product ${!inStock && "outofstock"}`}>
        <Link to={`/${id}`}>
          <div className="image-container">
            <img className="product__image" src={gallery[0]} alt={name} />
            {!inStock && (
              <div className="outofstock">
                <p>Out of stock</p>
              </div>
            )}
          </div>
        </Link>
        <p className="product__name">
          {brand} {name}
        </p>
        <Price prices={prices} />
        {inStock && (
          <button
            className="product__button"
            onClick={this.handleAddToCartButtonClick}
          >
            <div className="product__button-icon icon">
              <img
                src="/images/empty-cart-white.svg"
                alt="add to cart"
                className="icon"
              />
            </div>
          </button>
        )}
      </div>
    );
  }
}

export default connect(null, { addProductToCart })(Product);
