import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { store } from '@app/redux'

import { Notifications } from '@features/Notifications'
import { Page404 } from '@pages/404'
import { MainPage } from '@pages/MainPage/MainPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
])

export function App() {
  return (
    <Provider store={store}>
      <Notifications>
        <RouterProvider router={router} />
      </Notifications>
    </Provider>
  )
}
