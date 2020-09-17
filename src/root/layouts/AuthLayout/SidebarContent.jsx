import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'

import MetisMenu from 'metismenujs'
import {useTranslation} from 'react-i18next'

const activateParentDropdown = item => {
  item.classList.add('active')
  const parent = item.parentElement

  if (parent) {
    parent.classList.add('mm-active')
    const parent2 = parent.parentElement

    if (parent2) {
      parent2.classList.add('mm-show')

      const parent3 = parent2.parentElement

      if (parent3) {
        parent3.classList.add('mm-active') // li
        parent3.childNodes[0].classList.add('mm-active') // a
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add('mm-active')
        }
      }
    }
    return false
  }
  return false
}

const SidebarContent = () => {
  const location = useLocation()

  const {t} = useTranslation()

  const {pathname} = location

  useEffect(() => {
    const initMenu = () => {
      // eslint-disable-next-line no-new
      new MetisMenu('#side-menu')

      let matchingMenuItem = null
      const ul = document.getElementById('side-menu')
      const items = ul.getElementsByTagName('a')
      for (let i = 0; i < items.length; ++i) {
        if (pathname === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) activateParentDropdown(matchingMenuItem)
    }
    initMenu()
  }, [pathname])

  return (
    <>
      <div id='sidebar-menu'>
        <ul className='metismenu list-unstyled' id='side-menu'>
          <li className='menu-title'>{t('Menu')} </li>
          <li>
            <Link to='/#' className='waves-effect'>
              <i className='bx bx-home-circle' />
              <span className='badge badge-pill badge-info float-right'>
                03
              </span>
              <span>{t('Dashboards')}</span>
            </Link>
            <ul className='sub-menu'>
              <li>
                <Link to='/dashboard'>{t('Default')}</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SidebarContent
