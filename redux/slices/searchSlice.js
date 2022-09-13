import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchKeyword:
    typeof window !== 'undefined' && localStorage.getItem('searchKeyword')
      ? JSON.parse(localStorage.getItem('searchKeyword'))
      : '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addKeyword: (state, { payload }) => {
      state.searchKeyword = payload
      localStorage.setItem('searchKeyword', JSON.stringify(state.searchKeyword))
    },
  },
})

export const { addKeyword } = searchSlice.actions
export default searchSlice.reducer
