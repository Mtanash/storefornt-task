import { SET_CATEGORIES, SET_SELECTED_CATEGORY } from "../actionTypes";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setSelectedCategory = (selectedCategory) => ({
  type: SET_SELECTED_CATEGORY,
  payload: selectedCategory,
});
