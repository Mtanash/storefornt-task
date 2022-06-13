import { Component } from "react";
import { connect } from "react-redux";

import "./Price.css";

class Price extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: {
        amount: 0,
        currency: {
          symbol: "$",
          label: "USD",
        },
      },
    };
  }

  componentDidMount() {
    const { prices, currentCurrency } = this.props;

    const price = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );
    this.setState({ price });
  }

  componentDidUpdate() {
    const { prices, currentCurrency } = this.props;
    const { price: statePrice } = this.state;

    const price = prices.find(
      (price) => price.currency.label === currentCurrency.label
    );
    if (price.currency.label !== statePrice.currency.label) {
      this.setState({ price });
    }
  }

  render() {
    const { currency, amount } = this.state.price;

    return (
      <p className="price">
        <span>{currency.symbol}</span> {amount.toFixed(2)}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency,
});

export default connect(mapStateToProps)(Price);
