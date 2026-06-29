import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    SearchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { SearchProduct } = productSlide.actions

export default productSlide.reducer