import { type FC, useEffect } from 'react'

import { PAGE_COUNT } from '@features/Todo/consts'
import { getCurrentPage, getTotal } from '@features/Todo/selectors'
import { actions } from '@features/Todo/slice'
import { getList } from '@features/Todo/thunks/getList'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'

import { TodoCreator } from '../TodoCreator/TodoCreator'
import { Todos } from '../Todos/Todos'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const total = useAppSelector(getTotal)
  const currentPage = useAppSelector(getCurrentPage)

  useEffect(() => {
    dispatch(getList())
  }, [currentPage])

  return (
    <div className={cls.main}>
      <TodoCreator />
      <Todos />
      <Pagination
        pageCount={PAGE_COUNT}
        total={total}
        currentPage={currentPage}
        onChange={(v) => dispatch(actions.setCurrentPage(v))}
      />
    </div>
  )
}
