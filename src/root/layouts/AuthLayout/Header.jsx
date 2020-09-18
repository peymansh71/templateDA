import React, {useCallback} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// import {Dropdown, DropdownToggle, DropdownMenu, Row, Col} from 'reactstrap'

import LanguageDropdown from '~components/common/LanguageDropdown'

import layoutsSlice from '~redux/slices/layouts'

import logo from '~assets/images/logo/Nlogo.png'
import logoColor from '~assets/images/logo/AA_icon_color.png'

// import {useTranslation} from 'react-i18next'

const {changeSidebarType, toggleLeftMenu} = layoutsSlice.actions

const Header = () => {
  // const {t} = useTranslation()

  const dispatch = useDispatch()

  const toggleLeft = useCallback(status => dispatch(toggleLeftMenu(status)))
  const changeType = useCallback(type => dispatch(changeSidebarType(type)))

  const layouts = useSelector(state => state.layouts)
  const {leftMenu, leftSideBarType} = layouts

  function toggleMenu() {
    toggleLeft(!leftMenu)
    if (leftSideBarType === 'default') {
      changeType('condensed')
    } else if (leftSideBarType === 'condensed') {
      changeType('default')
    }
  }
  return (
    <>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box'>
              <Link to='/' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src={logoColor} alt='' height='22' />
                </span>
                <span className='logo-lg'>
                  <img src={logoColor} alt='' height='17' />
                </span>
              </Link>

              <Link to='/' className='logo logo-light'>
                <span className='logo-sm'>
                  <img src={logo} alt='' height='22' />
                </span>
                <span className='logo-lg'>
                  <img src={logo} alt='' height='19' />
                </span>
              </Link>
            </div>

            <button
              type='button'
              onClick={() => toggleMenu()}
              className='btn btn-sm px-3 font-size-16 header-item waves-effect'
              id='vertical-menu-btn'
            >
              <i className='fa fa-fw fa-bars' />
            </button>
          </div>
          <div className='d-flex'>
            <LanguageDropdown />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
