import React from 'react'

import Redux from './redux'
import Router from './router'

import '~styles/theme.scss'

const App = () => (
  <Redux>
    <Router />
  </Redux>
)

export default App
