import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showVolumeIndicator: false,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    // set Volume Indicator
    setShowVolumeIndicator(state, action) {
      state.showVolumeIndicator = action.payload;
    },
  },
});

export const { setShowVolumeIndicator } = featuresSlice.actions;

export default featuresSlice.reducer;
