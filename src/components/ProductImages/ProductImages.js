import { Component } from "react";
import "./ProductImages.css";

class ProductImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
    };
  }

  handleImageChange = (direction) => {
    if (direction === 1) {
      if (this.state.currentImageIndex < this.props.images.length - 1) {
        this.setState({
          ...this.state,
          currentImageIndex: this.state.currentImageIndex + 1,
        });
      } else {
        this.setState({ ...this.state, currentImageIndex: 0 });
      }
    } else if (direction === -1) {
      if (this.state.currentImageIndex > 0) {
        this.setState({
          ...this.state,
          currentImageIndex: this.state.currentImageIndex - 1,
        });
      } else {
        this.setState({
          ...this.state,
          currentImageIndex: this.props.images.length - 1,
        });
      }
    }
  };

  render() {
    return (
      <div className="product-images">
        <img
          className="product-images__img"
          src={this.props.images[this.state.currentImageIndex]}
          alt="product"
        />
        {this.props.images.length > 1 && (
          <div className="product-images__buttons">
            <button onClick={() => this.handleImageChange(1)}>
              <img src="/images/caret-left.png" alt="left" />
            </button>
            <button onClick={() => this.handleImageChange(-1)}>
              <img src="/images/caret-right.png" alt="left" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductImages;
