import type { StateSchema } from '@app/redux'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { api } from '@shared/api'

import { getList } from './getList'

export const create = createAsyncThunk<void, void, { rejectValue: string }>(
  'create',
  async (_, thunkApi) => {
    try {
      const _state = thunkApi.getState() as StateSchema
      const { description, title } = _state.todo
      await api.post('/todos', {
        description,
        title,
      })
      thunkApi.dispatch(getList())
      thunkApi.fulfillWithValue(null)
    } catch (e: any) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
