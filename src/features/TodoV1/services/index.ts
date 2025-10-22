import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { API_URL } from '@shared/consts'

import type { ITodo } from '../types'

export const todoApi = createApi({
  reducerPath: 'todoApi', // Даем осмысленное название нашему сервису
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }), // Тут передаем конфиг для определения куда будут идти запросы
  // endpoints - здесь описываем методы к API
  endpoints: (build) => ({
    // query - метод для получения данных (GET)
    getAllTodo: build.query<{ list: ITodo[]; total: number }, number>({
      // Конфигурация запроса
      query: (page) => ({
        // Этот параметр будет приплюсовываться в базовому
        url: '/todos',
        params: { page, pageCount: 10 },
      }),
    }),
  }),
})
