import {
  type AnyAction,
  type Reducer,
  type ReducersMapObject,
  combineReducers,
} from '@reduxjs/toolkit'

import { type ReducerManager, type StateSchema, type StateSchemaKey } from '../types'

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers: Partial<Record<StateSchemaKey, Reducer>> = {
    ...initialReducers,
  }

  let combinedReducer = combineReducers(reducers as ReducersMapObject<StateSchema>)
  let keysToRemove: StateSchemaKey[] = []

  return {
    getReducerMap: () => reducers as ReducersMapObject<StateSchema>,

    reduce: (state: StateSchema | undefined, action: AnyAction) => {
      let newState = state

      if (keysToRemove.length > 0 && state) {
        newState = { ...state }
        keysToRemove.forEach((key) => {
          if (newState?.[key]) {
            // @ts-ignore
            delete newState[key]
          }
        })
        keysToRemove = []
      }

      return combinedReducer(newState, action)
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) return

      reducers[key] = reducer
      combinedReducer = combineReducers(reducers as ReducersMapObject<StateSchema>)
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) return

      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers as ReducersMapObject<StateSchema>)
    },
  }
}
