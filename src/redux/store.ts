import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import filterReducer from "./features/filterSlice/filterSlice"; // Filter slice import
import cartSlice from "./features/cart/cartSlice"

// Persist configuration for authentication state
const persistConfig = {
  key: "auth",
  storage,
};

const persistOptions = {
  key: "cart",
  storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);


const persistedCart = persistReducer(persistOptions, cartSlice);

// Create the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query API Reducer 
    auth: persistedAuthReducer, // Persisted auth state
    filter: filterReducer, // New Filter Reducer
    cart: persistedCart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a persistor for persisting authentication state
export const persistor = persistStore(store);
