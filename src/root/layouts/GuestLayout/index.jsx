import React, {useState} from 'react'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CustomInput,
} from 'reactstrap'
import {useTranslation} from 'react-i18next'

// components
import LanguageDropdown from '~components/common/LanguageDropdown'

// assets
import logo from '~assets/images/logo/AA_logo_icon_white.png'
import logoHorizontal from '~assets/images/logo/DA-logo-white.svg'

import s from './styles.m.scss'

const GuestLayout = ({children}) => {
  const {t} = useTranslation()

  const [checked, setChecked] = useState(false)

  return (
    <div
      className={`${s.layout} d-flex justify-content-center align-items-center`}
    >
      <Navbar dark expand className={s.layout__header}>
        <NavbarBrand href='/' className='mr-auto'>
          <img
            className={`${s.layout__logoH} d-none d-md-block`}
            alt='diversity-logo'
            src={logoHorizontal}
          />
          <img
            className={`${s.layout__logo} d-md-none`}
            alt='diversity-logo'
            src={logo}
          />
        </NavbarBrand>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className='text-light'>
              <i className='fa fa-eye mr-2' />
              {t('accessibility')}
            </DropdownToggle>
            <DropdownMenu right className={s.layout__dropdown}>
              <DropdownItem>
                <div className={s.accessibility}>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <span className={s.accessibility__label}>
                      {t('contrast_fonts')}
                    </span>
                    <CustomInput
                      className={s.accessibility__switch}
                      type='switch'
                      id='contrast_fonts'
                      name='contrast_fonts'
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  </div>
                  <div>{t('improve_contrast_fonts')}</div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem className={s.layout__langs}>
            <LanguageDropdown />
          </NavItem>
        </Nav>
      </Navbar>

      <div className={s.layout__page}>{children}</div>
    </div>
  )
}

export default GuestLayout
