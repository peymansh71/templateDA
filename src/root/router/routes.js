import {lazy} from 'react'

// Layouts
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))
const GuestLayout = lazy(() => import('../layouts/GuestLayout'))

// Routes
const Home = lazy(() => import('~pages/home'))
const Login = lazy(() => import('~pages/login'))
const NotFound = lazy(() => import('~pages/404'))
const Registration = lazy(() => import('~pages/registration'))

const routes = [
  {
    path: '/',
    layout: AuthLayout,
    protected: false,
    component: Home,
  },
  {
    path: '/registration',
    layout: GuestLayout,
    protected: false,
    component: Registration,
  },
  {
    path: '/login',
    layout: GuestLayout,
    protected: false,
    component: Login,
  },
  {
    path: '*',
    layout: GuestLayout,
    component: NotFound,
  },
]

export default routes
