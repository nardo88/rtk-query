import { type FC } from 'react'

import { todoApi } from '@features/Todo'
import { getDescription, getIsOpen, getTitle } from '@features/Todo/selectors'
import { actions } from '@features/Todo/slice'
import { create } from '@features/Todo/thunks/create'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Button from '@shared/ui/Button/Button'
import { Input } from '@shared/ui/Input/Input'
import { Popup } from '@shared/ui/Popup/Popup'

import cls from './TodoCreator.module.scss'

interface IProps {
  refetch: () => void
}

export const TodoCreator: FC<IProps> = ({ refetch }) => {
  const dispatch = useAppDispatch()

  const isOpen = useAppSelector(getIsOpen)
  const title = useAppSelector(getTitle)
  const description = useAppSelector(getDescription)

  const [add, { isLoading }] = todoApi.useAddMutation()

  const clickHandler = () => {
    add({ title, description }).then(() => dispatch(actions.setIsOpen(false)))
  }

  return (
    <div className={cls.todoCreator}>
      <Button onClick={() => dispatch(actions.setIsOpen(true))}>Add todo</Button>
      {isOpen && (
        <Popup onClose={() => dispatch(actions.setIsOpen(false))} title="Создание TODO">
          <div className={cls.content}>
            <Input label="title" value={title} onChange={(v) => dispatch(actions.setTitle(v))} />
            <Input
              label="description"
              value={description}
              onChange={(v) => dispatch(actions.setDescription(v))}
            />
            <Button disabled={isLoading} onClick={clickHandler}>
              save
            </Button>
          </div>
        </Popup>
      )}
    </div>
  )
}
