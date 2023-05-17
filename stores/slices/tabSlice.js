import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState = {
  selectedTab: '',
};

const tabSlice = createSlice({
  name: 'Tab',
  initialState,
  reducers: {
    setTabSelected: (state, action ) => {
      console.log('action: ', action);
      state.selectedTab = action.payload;
    },
  },
});

export const { setTabSelected } = tabSlice.actions;

export default tabSlice;