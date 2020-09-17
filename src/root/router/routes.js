import {lazy} from 'react'

// Layouts
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))
const GuestLayout = lazy(() => import('../layouts/GuestLayout'))

// Routes
const Home = lazy(() => import('~pages/home'))
const NotFound = lazy(() => import('~pages/404'))

const routes = [
  {
    path: '/',
    layout: AuthLayout,
    protected: false,
    component: Home,
  },
  {
    path: '/registration',
    layout: AuthLayout,
    protected: false,
    component: Home,
  },
  {
    path: '*',
    layout: GuestLayout,
    component: NotFound,
  },
]

export default routes
