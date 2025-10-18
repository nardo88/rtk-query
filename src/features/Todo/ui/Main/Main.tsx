import { type FC } from 'react'

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux'
import Button from '@shared/ui/Button/Button'

import { getCount } from '../../selectors'
import { actions } from '../../slice'

import cls from './Main.module.scss'

export const Main: FC = () => {
  const dispatch = useAppDispatch()

  const count = useAppSelector(getCount)
  return (
    <div className={cls.main}>
      <p>{count}</p>
      <Button onClick={() => dispatch(actions.setCount(false))}>click</Button>
    </div>
  )
}
