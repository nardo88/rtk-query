import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type ITodoSchema } from '../types'

const initialState: ITodoSchema = {
  isLoading: false,
  count: 0,
}

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setCount(state, _action: PayloadAction<boolean>) {
      state.count += 1
    },
  },
  extraReducers(builder) {
    // builder
    //   // Комментарий
    //   .addCase(thunk.pending, (state) => {
    //     state.isLoading = true
    //     state.errorCode = null
    //   })
    //   .addCase(thunk.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.institutions = action.payload
    //   })
    //   .addCase(thunk.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.errorCode = action.payload || null
    //   })
  },
})

export const { actions } = slice
export const { reducer } = slice
