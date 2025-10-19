import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/api'

import { getList } from './getList'

export const remove = createAsyncThunk<void, string, { rejectValue: string }>(
  'remove',
  async (id, thunkApi) => {
    try {
      await api.delete(`/todos/${id}`)
      thunkApi.dispatch(getList())
      thunkApi.fulfillWithValue(null)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
