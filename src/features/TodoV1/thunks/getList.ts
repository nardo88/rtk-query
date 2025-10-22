import type { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/api'

import { PAGE_COUNT } from '../consts'
import type { ITodo } from '../types'

interface IOutputData {
  list: ITodo[]
  total: number
}

export const getList = createAsyncThunk<IOutputData, void, { rejectValue: string }>(
  'getList',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const { currentPage } = _state.todo
      const { data } = await api.get<IOutputData>('/todos', {
        params: { page: currentPage, pageCount: PAGE_COUNT },
      })
      return thunkApi.fulfillWithValue(data)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
