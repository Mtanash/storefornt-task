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
    return (
      <div className={`product ${!this.props.product.inStock && "outofstock"}`}>
        <Link to={`/${this.props.product.id}`}>
          <div className="image-container">
            <img
              className="product__image"
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
            />
            {!this.props.product.inStock && (
              <div className="outofstock">
                <p>Out of stock</p>
              </div>
            )}
          </div>
        </Link>
        <p className="product__name">{this.props.product.name}</p>
        <Price prices={this.props.product.prices} />
        {this.props.product.inStock && (
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
