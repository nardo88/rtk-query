import { type FC, useEffect } from 'react'

import { PAGE_COUNT } from '@features/Todo/consts'
import { getCurrentPage } from '@features/Todo/selectors'
import { actions } from '@features/Todo/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'

import { getTotal } from '../../selectors'
import { getList } from '../../thunks/getList'
import { TodoCreator } from '../TodoCreator/TodoCreator'
import { Todos } from '../Todos/Todos'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(getCurrentPage)
  const total = useAppSelector(getTotal)

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
