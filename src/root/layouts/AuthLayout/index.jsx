import React, {useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import layoutsSlice, {changeLayoutWidth} from '~redux/slices/layouts'

// Layout Related Components
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const {
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
} = layoutsSlice.actions

const Layout = ({children}) => {
  const dispatch = useDispatch()

  const changeType = useCallback(type => dispatch(changeSidebarType(type)))
  const changeWidth = useCallback(width => dispatch(changeLayoutWidth(width)))
  const changeTheme = useCallback(theme => dispatch(changeSidebarTheme(theme)))
  const changeTopTheme = useCallback(theme =>
    dispatch(changeTopbarTheme(theme))
  )

  const layouts = useSelector(state => state.layouts)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (layouts.isPreloader === true) {
      document.getElementById('preloader').style.display = 'block'
      document.getElementById('status').style.display = 'block'

      setTimeout(() => {
        document.getElementById('preloader').style.display = 'none'
        document.getElementById('status').style.display = 'none'
      }, 2500)
    } else {
      document.getElementById('preloader').style.display = 'none'
      document.getElementById('status').style.display = 'none'
    }

    if (layouts.leftSideBarTheme) changeTheme(layouts.leftSideBarTheme)
    if (layouts.layoutWidth) changeWidth(layouts.layoutWidth)
    if (layouts.leftSideBarType) changeType(layouts.leftSideBarType)
    if (layouts.topbarTheme) changeTopTheme(layouts.topbarTheme)
  }, [])

  return (
    <>
      <div id='preloader'>
        <div id='status'>
          <div className='spinner-chase'>
            <div className='chase-dot' />
            <div className='chase-dot' />
            <div className='chase-dot' />
            <div className='chase-dot' />
            <div className='chase-dot' />
            <div className='chase-dot' />
          </div>
        </div>
      </div>

      <div id='layout-wrapper'>
        <Header />
        <Sidebar type={layouts.leftSideBarType} />
        <div className='main-content'>{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
