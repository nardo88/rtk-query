import { type FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'

import { TodoCreator } from '../TodoCreator/TodoCreator'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={cls.main}>
      <TodoCreator />
    </div>
  )
}
