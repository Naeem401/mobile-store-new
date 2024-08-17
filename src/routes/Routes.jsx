import { createBrowserRouter } from 'react-router-dom'
import AllProducts from '../components/AllProducts'
import Register from '../components/Register'
import Login from '../components/Login'
import Main from '../layouts/Main'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    children: [
        {
            path: '/',
            element: <AllProducts/>
        }
    ]
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])

export default router