import type { FC } from 'react'

import { Todo } from '@features/Todo'
import { Layout } from '@widgets/Layout/Layout'

export const MainPage: FC = () => {
  return (
    <Layout>
      <div className="container">
        <Todo />
      </div>
    </Layout>
  )
}
