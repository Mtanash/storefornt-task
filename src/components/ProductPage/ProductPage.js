import { Component } from "react";
import parse from "html-react-parser";
import Price from "../Price/Price";
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/actions/cart";
import { getProductById } from "../../apollo/queries";
import "./ProductPage.css";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: window.location.pathname.split("/")[1],
      product: {},
      selectedAttributes: {},
      currentImageIndex: 0,
    };
  }

  changeCurrentImageIndex = (index) => {
    this.setState({ ...this.state, currentImageIndex: index });
  };

  handleAttributeChange = (attName, itemValue) => {
    this.setState({
      ...this.state,
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [attName]: itemValue,
      },
    });
  };

  handleAddToCartButtonClick = () => {
    const { id, name, brand, gallery, prices, attributes } = this.state.product;
    if (
      Object.keys(this.state.selectedAttributes).length !== attributes.length
    ) {
      alert("Please select attributes");
      return;
    }
    this.props.addProductToCart(
      {
        name,
        id,
        gallery,
        prices,
        brand,
        attributes,
        selectedAttributes: this.state.selectedAttributes,
      },
      1
    );
  };

  async componentDidMount() {
    const response = await getProductById(this.state.productId);
    this.setState({ product: response.data.product });
  }

  render() {
    const { gallery, name, inStock, brand, attributes, prices, description } =
      this.state.product;

    const { selectedAttributes } = this.state;

    return !this.state.product?.name ? (
      <section>
        <p>Loading...</p>
      </section>
    ) : (
      <section className="product-page full-height">
        <div className="container">
          <div className="product-page__layout">
            <div className="produt-page__gallery">
              {gallery.map((pic, index) => (
                <img
                  key={pic}
                  src={pic}
                  alt={name}
                  onClick={() => this.changeCurrentImageIndex(index)}
                />
              ))}
            </div>
            <div className="product-page__image">
              <img src={gallery[this.state.currentImageIndex]} alt={name} />
              {!inStock && (
                <div className="outofstock">
                  <p>Out of stock</p>
                </div>
              )}
            </div>
            <div className="product-page__details">
              <h2 className="product-page__name">{name}</h2>
              <h3 className="product-page__brand">{brand}</h3>
              <div className="product-page__attributes">
                {attributes.map((att) => (
                  <div key={att.id} className="attribute-row">
                    <p className="attribute-row__title">{att.name}:</p>
                    <div className="attribute-row__values">
                      {att.items.map((item) => (
                        <button
                          onClick={(e) =>
                            this.handleAttributeChange(att.name, item.value)
                          }
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
              <div className="product-page__price">
                <p className="price-text">Price:</p>
                <Price prices={prices} />
              </div>
              <button
                className="product-page__button"
                disabled={!inStock}
                onClick={this.handleAddToCartButtonClick}
              >
                {inStock ? "Add to cart" : "Out of stock"}
              </button>
              <div className="product-page__description">
                {parse(description)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, { addProductToCart })(ProductPage);
