import React from 'react'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

// components
import LanguageDropdown from '~components/LanguageDropdown'

// assets
import logo from '~assets/images/logo/AA_logo_black_horizontal.png'

import styles from './styles.m.scss'

const GuestLayout = ({children}) => (
  <div
    className={`${styles.layout} d-flex justify-content-center align-items-center`}
  >
    <Navbar dark expand className={styles.layout__header}>
      <NavbarBrand href='/' className='mr-auto'>
        <img className={styles.layout__logo} alt='diversity-logo' src={logo} />
      </NavbarBrand>
      <Nav navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className='text-light'>
            Accessibility
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Option 1</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem className={styles.layout__langs}>
          <LanguageDropdown />
        </NavItem>
      </Nav>
    </Navbar>

    <div className='w-100'>{children}</div>
  </div>
)

export default GuestLayout
