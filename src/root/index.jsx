import React from 'react'

import Redux from './redux'
import Router from './router'

import '~styles/app.scss'

const App = () => (
  <Redux>
    <Router />
  </Redux>
)

export default App
