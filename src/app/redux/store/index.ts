import {
  type CombinedState,
  type Reducer,
  type ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit'

import { todoReducer } from '@features/Todo'

import { createReducerManager } from '../services'
import { type StateSchema } from '../types'

const rootReducer: ReducersMapObject<StateSchema> = {
  todo: todoReducer,
}

const reducerManager = createReducerManager(rootReducer)

const store = configureStore({
  reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
  devTools: true, // Определяем mode. Он определяет будут ли работать devtools (плагин redux)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// @ts-ignore
store.reducerManager = reducerManager

export default store
