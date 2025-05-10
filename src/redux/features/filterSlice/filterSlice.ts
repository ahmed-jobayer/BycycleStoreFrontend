// src/redux/features/filterSlice/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the filter state interface
interface FilterState {
  search: string;
  priceRange: [number, number];
  type: string;
  brand: string;
  availability: boolean;
}

// Initial state
const initialState: FilterState = {
  search: "",
  priceRange: [0, 10000],
  type: "",
  brand: "",
  availability: false,
};

// Create the filter slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Action to set/update a filter value
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    // Action to reset all filters to their initial values
    resetFilters: () => {
      return initialState;
    },
  },
});

// Export the actions
export const { setFilter, resetFilters } = filterSlice.actions;

// Export the reducer
export default filterSlice.reducer;