import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tableData: [],
};

const tableSlice = createSlice({
  name: 'userTable',
  initialState,
  reducers: {
    addRow: (state, action) => {
        state.tableData = [...state.tableData, action.payload];
    },
  },
});

export const { addRow } = tableSlice.actions;

export default tableSlice.reducer;
