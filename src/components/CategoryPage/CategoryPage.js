import { Component } from "react";
import { connect } from "react-redux";
import Product from "../Product/Product";
import { getProductsByCategory } from "../../apollo/queries";
import "./CategoryPage.css";

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentCategoryName: this.props.selectedCategory,
    };
  }

  async componentDidMount() {
    const response = await getProductsByCategory(this.props.selectedCategory);
    this.setState({ products: response.data.category.products });
  }

  async componentDidUpdate() {
    const response = await getProductsByCategory(this.props.selectedCategory);
    if (response.data.category.name !== this.state.currentCategoryName) {
      this.setState({
        products: response.data.category.products,
        currentCategoryName: response.data.category.name,
      });
    }
  }

  render() {
    return (
      <section className="category-page full-height">
        <div className="container">
          <h2 className="category-page__title">
            {this.props.selectedCategory}
          </h2>
          <div className="category-page__products">
            {this.state.products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCategory: state.categories.selectedCategory,
});

export default connect(mapStateToProps)(CategoryPage);
