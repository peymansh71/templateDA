import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import routes from './routes'

import {renderRoute} from './helpers'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
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
