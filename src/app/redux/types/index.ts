// Импорт типизации состояния
import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit'

import type { ITodoSchema } from '@features/Todo'

import store from '../store'

// тип store
export type RootState = ReturnType<typeof store.getState>
// тип dispatch
export type AppDispatch = typeof store.dispatch

// ручками описываем тип нашего состояния.
// динамические редьюсеры указываем как необязательные
export interface StateSchema {
  // Здесь перечисляем состояния постоянные
  todo: ITodoSchema
  // Ниже динамические
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
