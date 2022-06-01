import { Component } from "react";
import { connect } from "react-redux";
import CartButton from "../CartButton/CartButton";
import CurrencyButton from "../CurrencyButton/CurrencyButton";
import { setSelectedCategory } from "../../redux/actions/category";

import "./Header.css";

class Header extends Component {
  handleSelectingCategory = (categoryName) => {
    this.props.setSelectedCategory(categoryName);
  };

  render() {
    return (
      <header className="header">
        <div className="container">
          <nav className="header__nav">
            {this.props?.categories?.map((category, index) => (
              <button
                key={index}
                className={
                  this.props.selectedCategory === category.name
                    ? "active"
                    : null
                }
                onClick={() => this.handleSelectingCategory(category.name)}
              >
                {category.name}
              </button>
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
