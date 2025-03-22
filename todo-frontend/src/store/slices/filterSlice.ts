import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  sortBy: 'PRIORITY' | 'STATUS' | 'NONE';
}

const initialState: FilterState = {
  searchQuery: '',
  sortBy: 'NONE',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action: PayloadAction<'PRIORITY' | 'STATUS' | 'NONE'>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;