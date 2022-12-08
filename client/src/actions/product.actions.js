import {
  GET_ALL_PRODUCT_FAIL,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_DISCOUNT_PRODUCT_SUCCESS,
  GET_FILTERED_PROUDCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "../constants/reducer.constants.js/product.constants";
import axios from "axios";

export const getAllProductsAPI = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCT_REQUEST });
 
  try {
    const { data } = await axios.get("https://tata-1mg-t.vercel.app/products");
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data.data });
  
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_FAIL,
      payload: "Failed To Fetch the data",
    });
  }
};

export const filterByBrandAPI = (payload) => async (dispatch) => {
  dispatch({ type: GET_FILTERED_PROUDCT_SUCCESS, payload: payload });
};

export const getDiscountProductAPI = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://tata-1mg-t.vercel.app/products/filter?discount=${payload}`
    );
    dispatch({ type: GET_DISCOUNT_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_FAIL,
      payload: "Failed To Fetch the data",
    });
  }
};

//// SINGLE PRODUCTS
export const getSingleProductAPI = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
  try {
    const { data } = await axios.get(
      `https://tata-1mg-t.vercel.app/products/data/${id}`
    );
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCT_FAIL, payload: error });
  }
};

//// sorting
export const sortItems = (value) => async (dispatch, getState) => {
  const { productList } = getState((state) => state.productList);
  const { filteredProducts } = productList;
 
  let newProducts = filteredProducts;
  if (value === "plth") {
    newProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (value === "phtl") {
    newProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (value === "rlth") {
    newProducts = filteredProducts.sort((a, b) => a.ratings - b.ratings);
  } else if (value === "rhtl") {
    newProducts = filteredProducts.sort((a, b) => b.ratings - a.ratings);
  }
  dispatch({ type: GET_FILTERED_PROUDCT_SUCCESS, payload: newProducts });
};
