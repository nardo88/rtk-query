import { type FC, useEffect } from 'react'
import { useStore } from 'react-redux'

import type { ReduxStoreWithManager } from '@app/redux'

import { todoApi } from '@features/Todo'
import { PAGE_COUNT } from '@features/Todo/consts'
import { getCurrentPage } from '@features/Todo/selectors'
import { actions } from '@features/Todo/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Spinner } from '@shared/ui/Spinner/Spinner'

import { TodoCreator } from '../TodoCreator/TodoCreator'
import { Todos } from '../Todos/Todos'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(getCurrentPage)

  const { isLoading, data, error, refetch } = todoApi.useGetAllTodoQuery(currentPage)

  return (
    <div className={cls.main}>
      {isLoading && <Spinner />}
      <TodoCreator refetch={refetch} />
      <Todos data={data?.list || []} />
      <Pagination
        pageCount={PAGE_COUNT}
        total={data?.total || 0}
        currentPage={currentPage}
        onChange={(v) => dispatch(actions.setCurrentPage(v))}
      />
    </div>
  )
}
