import { gql } from "@apollo/client";
import React from "react";
import { client } from "./apollo";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import { connect } from "react-redux";
import { setCategories } from "./redux/actions/category";
import CartPage from "./components/CartPage/CartPage";

class App extends React.Component {
  componentDidMount() {
    client
      .query({
        query: gql`
          query {
            categories {
              name
            }
          }
        `,
      })
      .then((response) => {
        this.props.setCategories(response.data.categories);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CategoryPage />}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:productId" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default connect(null, { setCategories })(App);
