import type { StateSchema } from '@app/redux'

import type { ITodo } from '../types'

export const getTodos = (state: StateSchema): ITodo[] => state.todo.todos
export const getIsOpen = (state: StateSchema) => state.todo.isOpen
export const getTitle = (state: StateSchema) => state.todo.title
export const getDescription = (state: StateSchema) => state.todo.description
export const getTotal = (state: StateSchema) => state.todo.total
export const getCurrentPage = (state: StateSchema) => state.todo.currentPage
