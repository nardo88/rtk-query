import { type FC, useEffect } from 'react'

import { todoApi } from '@features/Todo'
import { PAGE_COUNT } from '@features/Todo/consts'
import { getCurrentPage } from '@features/Todo/selectors'
import { actions } from '@features/Todo/slice'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Pagination from '@shared/ui/Pagination/Pagination'
import { Spinner } from '@shared/ui/Spinner/Spinner'
import { Text } from '@shared/ui/Text/Text'

import { TodoCreator } from '../TodoCreator/TodoCreator'
import { Todos } from '../Todos/Todos'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(getCurrentPage)

  // useGetAllTodoQuery - автоматически сгенерированный хук. Первым аргументом он принимает параметр который должен как то использоваться в запросе. У нас такого нет, поэтому передаем пустую строку
  const { isLoading, data, error, refetch } = todoApi.useGetAllTodoQuery(currentPage, {
    // pollingInterval: 1000, // Запрос будет отправляться каждую секунду
  })
  console.log('error: ', error)

  useEffect(() => {
    refetch()
  }, [currentPage])

  // 29:16

  return (
    <div className={cls.main}>
      {isLoading && <Spinner />}
      {error && <Text variant="error">{error.data?.message.join('')}</Text>}
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
