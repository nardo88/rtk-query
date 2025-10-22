import type { FC } from 'react'

import { Todo } from '@features/Todo'
import { TodoV1 } from '@features/TodoV1'
import { Layout } from '@widgets/Layout/Layout'

export const MainPage: FC = () => {
  return (
    <Layout>
      <div className="container">
        <Todo />
        <Todo />
        {/* <TodoV1 />
        <TodoV1 /> */}
      </div>
    </Layout>
  )
}
