import { combineReducers } from "redux";
import categories from "./categories";
import currency from "./currency";
import cart from "./cart";

export default combineReducers({ categories, currency, cart });
