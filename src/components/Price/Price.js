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
    const price = this.props.prices.find(
      (price) => price.currency.label === this.props.currentCurrency.label
    );
    this.setState({ price });
  }

  componentDidUpdate() {
    const price = this.props.prices.find(
      (price) => price.currency.label === this.props.currentCurrency.label
    );
    if (price.currency.label !== this.state.price.currency.label) {
      this.setState({ price });
    }
  }

  render() {
    return (
      <p className="price">
        <span>{this.state.price.currency.symbol}</span>{" "}
        {this.state.price.amount}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency,
});

export default connect(mapStateToProps)(Price);
