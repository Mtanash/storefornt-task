import { SET_CURRENCY } from "../actionTypes";

const initialState = { __typename: "Currency", label: "USD", symbol: "$" };

const currency = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default currency;
