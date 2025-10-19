import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type ITodoSchema } from '../types'

const initialState: ITodoSchema = {
  isLoading: false,
  todos: [],
  isOpen: false,
  // editor
  description: '',
  title: '',
}

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
  },
  extraReducers(_builder) {
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
