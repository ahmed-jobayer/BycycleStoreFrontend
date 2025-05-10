
import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/utils/types";
import { RootState } from "@/redux/store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
}

//* Load from localStorage
const loadCartFromLocalStorage = (): InitialState => {
  if (typeof window === "undefined") {
    return {
      products: [],
      city: "",
      shippingAddress: "",
    };
  }
  try {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.log("Failed to load cart from localStorage:", error);
  }
  return {
    products: [],
    city: "",
    shippingAddress: "",
  };
};

//* Save to localStorage
const saveCartToLocalStorage = (cart: InitialState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const initialState: InitialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //* Add product
    addProduct: (state, action) => {
        console.log({state, action});
      const existingProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].orderQuantity += 1; //? If the product already exists, update the quantity
      } else {
        state.products.push({ ...action.payload, orderQuantity: 1 }); //? Add new product with quantity = 1
      }

      //? Save updated state to localStorage
      saveCartToLocalStorage(state);
    },

    //* Increment quantity
    incrementQuantity: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.orderQuantity += 1;
        saveCartToLocalStorage(state);
      }
    },

    //* Decrement quantity
    decrementQuantity: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product && product.orderQuantity > 1) {
        product.orderQuantity -= 1;
        saveCartToLocalStorage(state);
      }
    },

    //* Remove product
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      saveCartToLocalStorage(state);
    },

    //* Set city
    setCity: (state, action) => {
      state.city = action.payload;
      saveCartToLocalStorage(state);
    },

    //* Set shipping address
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      saveCartToLocalStorage(state);
    },

    //* Clear only the products
    clearCartItems: (state) => {
      state.products = [];
      saveCartToLocalStorage(state);
    },

    //* Reset entire cart (clear products, city, address) and remove from localStorage
    resetCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
      localStorage.removeItem("cart"); //? Completely clear localStorage
    },
  },
});

//* products

export const orderedMedicinesSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      price: product.price,
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    city: state.cart.city,
  };
};

export const {
  addProduct, 
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  setCity,
  setShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;