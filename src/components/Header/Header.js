import { Component } from "react";
import { connect } from "react-redux";
import CartButton from "../CartButton/CartButton";
import CurrencyButton from "../CurrencyButton/CurrencyButton";
import { setSelectedCategory } from "../../redux/actions/category";
import { Link } from "react-router-dom";

import "./Header.css";

class Header extends Component {
  handleSelectingCategory = (categoryName) => {
    this.props.setSelectedCategory(categoryName);
  };

  render() {
    const { categories, selectedCategory } = this.props;

    return (
      <header className="header">
        <div className="container">
          <nav className="header__nav">
            {categories?.map((category, index) => (
              <Link
                key={index}
                className={selectedCategory === category.name ? "active" : null}
                onClick={() => this.handleSelectingCategory(category.name)}
                to="/"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <div className="header__logo">
            <img src="/images/logo.png" alt="logo" width="41px" height="41px" />
          </div>
          <div className="header__buttons">
            <CurrencyButton />
            <CartButton />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  selectedCategory: state.categories.selectedCategory,
});

export default connect(mapStateToProps, { setSelectedCategory })(Header);
