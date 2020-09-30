import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import routes from './routes'

import {renderRoute} from './helpers'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from='/' to='/login' />
        {routes.map(route => (
          <Route
            key={route.path}
            exact
            path={route.path}
            render={renderRoute(route)}
          />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
