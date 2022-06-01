import { SET_CURRENCY } from "../actionTypes";

export const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency,
});
