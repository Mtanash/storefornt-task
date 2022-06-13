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
    const { currentImageIndex } = this.state;

    const { images } = this.props;

    if (direction === 1) {
      if (currentImageIndex < images.length - 1) {
        this.setState({
          ...this.state,
          currentImageIndex: currentImageIndex + 1,
        });
      } else {
        this.setState({ ...this.state, currentImageIndex: 0 });
      }
    } else if (direction === -1) {
      if (currentImageIndex > 0) {
        this.setState({
          ...this.state,
          currentImageIndex: currentImageIndex - 1,
        });
      } else {
        this.setState({
          ...this.state,
          currentImageIndex: images.length - 1,
        });
      }
    }
  };

  render() {
    const { images } = this.props;

    const { currentImageIndex } = this.state;

    return (
      <div className="product-images">
        <img
          className="product-images__img"
          src={images[currentImageIndex]}
          alt="product"
        />
        {images.length > 1 && (
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
