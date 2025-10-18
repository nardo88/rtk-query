import type { StateSchema } from '@app/redux'

export const getCount = (state: StateSchema) => state.todo.count
