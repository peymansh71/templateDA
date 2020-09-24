import {useLayoutEffect} from 'react'
// import {useSelector} from 'react-redux'
import {useHistory, useRouteMatch} from 'react-router-dom'

const Guard = ({children, route}) => {
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const authenticated = false

  useLayoutEffect(() => {
    if (authenticated && route.guest) {
      const {search} = history.location
      history.replace({pathname: '/dashboard', search})
    } else if (!authenticated && route.protected) {
      const {search} = history.location
      history.replace({pathname: '/login', search})
    }
  }, [routeMatch.path])
  return children
}

export default Guard
