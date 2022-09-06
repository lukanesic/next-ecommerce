import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchKeyword: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addKeyword: (state, { payload }) => {
      state.searchKeyword = payload
    },
  },
})

export const { addKeyword } = searchSlice.actions
export default searchSlice.reducer
