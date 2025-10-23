import { type FC, useState } from 'react'

import { todoApi } from '@features/Todo'
import { getTodos } from '@features/Todo/selectors'
import { remove } from '@features/Todo/thunks/remove'
import type { ITodo } from '@features/Todo/types'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import { Text } from '@shared/ui/Text/Text'
import RemoveIcon from '@shared/ui/icons/RemoveIcon'

import cls from './Todos.module.scss'

const TodosItem: FC<ITodo> = (props) => {
  const { title, description, _id } = props
  const dispatch = useAppDispatch()

  const [remove, { isLoading, data, error }] = todoApi.useRemoveMutation({})

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={cls.todos}>
      <div className={cls.top} onClick={() => setIsOpen((p) => !p)}>
        <Text>{title}</Text>
        {isLoading && <p>Loading</p>}
        <RemoveIcon
          onClick={(e) => {
            e.stopPropagation()
            remove(_id)
              .then(() => console.log(1))
              .catch((e) => console.log('error', e))
          }}
        />
      </div>
      {isOpen && (
        <div className={cls.content}>
          <Text variant="helper">Описание</Text>
          <Text>{description}</Text>
        </div>
      )}
    </div>
  )
}

interface IProps {
  data: ITodo[]
}
export const Todos: FC<IProps> = ({ data }) => {
  if (!data.length)
    return (
      <Text className={cls.emptyData} variant="helper">
        Нет данных для отображения
      </Text>
    )
  return (
    <div className={cls.list}>
      {data.map((item) => (
        <TodosItem key={item._id} {...item} />
      ))}
    </div>
  )
}
