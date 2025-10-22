import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { create } from '../thunks/create'
import { getList } from '../thunks/getList'
import { type ITodoSchema } from '../types'

const initialState: ITodoSchema = {
  isLoading: false,
  todos: [],
  isOpen: false,
  errorCode: null,
  currentPage: 1,
  total: 0,
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      // Создание
      .addCase(create.pending, (state) => {
        state.isLoading = true
        state.errorCode = null
      })
      .addCase(create.fulfilled, (state) => {
        state.isLoading = false
        state.title = ''
        state.description = ''
        state.isOpen = false
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.errorCode = action.payload || null
      })
      // Получение
      .addCase(getList.pending, (state) => {
        state.isLoading = true
        state.errorCode = null
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload.list
        state.total = action.payload.total
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false
        state.errorCode = action.payload || null
      })
  },
})

export const { actions } = slice
export const { reducer } = slice
