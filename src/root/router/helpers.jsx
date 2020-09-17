import React, {Suspense} from 'react'

import Guard from '~root/guard'

export const Loadable = ({fallback = null, children}) => (
  <Suspense fallback={fallback}>{children}</Suspense>
)

export const renderRoute = route => props => (
  <Guard route={route}>
    <Loadable>
      <route.layout>
        <Loadable>
          <route.component {...props} />
        </Loadable>
      </route.layout>
    </Loadable>
  </Guard>
)
