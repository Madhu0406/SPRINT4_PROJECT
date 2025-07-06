import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    category: null,    
    availability: "all",    
    search: "",
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload; 
    },
    setAvailabilityFilter: (state, action) => {
      state.availability = action.payload; 
    },
    setSearchFilter: (state, action) => {
      state.search = action.payload;
    },
  }
});

export const { setCategoryFilter, setAvailabilityFilter, setSearchFilter } = filterSlice.actions;
export default filterSlice.reducer;
