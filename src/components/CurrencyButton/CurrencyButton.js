import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrencies } from "../../apollo/queries";
import { setCurrency } from "../../redux/actions/currency";
import "./CurrencyButton.css";

class CurrencyButton extends Component {
  constructor(props) {
    super(props);

    this.currencyButtonRef = React.createRef();

    this.state = {
      currencyMenuIsOpen: false,
      currencies: [],
    };
  }

  handleClickAway = (e) => {
    if (!this.currencyButtonRef.current.contains(e.target)) {
      this.closeCurrencyMenu();
    }
  };

  async componentDidMount() {
    const response = await getCurrencies();
    this.setState({ currencies: response.data.currencies });

    document.addEventListener("click", this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickAway);
  }

  toggleCurrencyMenuIsOpen = () => {
    this.setState({ currencyMenuIsOpen: !this.state.currencyMenuIsOpen });
  };

  closeCurrencyMenu = () => {
    this.setState({ currencyMenuIsOpen: false });
  };

  handleSetCurrency = (currency) => {
    this.props.setCurrency(currency);
  };

  render() {
    return (
      <button
        ref={this.currencyButtonRef}
        className="currency-button"
        onClick={this.toggleCurrencyMenuIsOpen}
      >
        <div className="icon currency-button__symbol">
          {this.props.currentCurrency.symbol}
        </div>
        {this.state.currencyMenuIsOpen ? (
          <img
            src="/images/arrow-up.svg"
            alt="arrow-up"
            width="8px"
            height="4px"
          />
        ) : (
          <img
            src="/images/arrow-down.svg"
            alt="arrow-down"
            width="8px"
            height="4px"
          />
        )}
        <div
          className={`currency-button__menu ${
            !this.state.currencyMenuIsOpen && "hidden"
          }`}
        >
          {this.state.currencies.map((currency, index) => (
            <p
              className="currency-button__option"
              key={index}
              onClick={() => this.handleSetCurrency(currency)}
            >
              <span>{currency.symbol}</span>
              {currency.label}
            </p>
          ))}
        </div>
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentCurrency: state.currency };
};

export default connect(mapStateToProps, { setCurrency })(CurrencyButton);
