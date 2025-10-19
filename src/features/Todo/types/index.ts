export interface ITodo {
  _id: string
  title: string
  description: string
  createdAt: number
  updatedAt: number
}

export interface ITodoSchema {
  isLoading: boolean
  todos: ITodo[]
  isOpen: boolean
  // editor
  title: string
  description: string
}
