import { SET_CATEGORIES, SET_SELECTED_CATEGORY } from "../actionTypes";

const initialState = { categories: [], selectedCategory: "all" };

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case SET_SELECTED_CATEGORY: {
      return { ...state, selectedCategory: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default categories;
