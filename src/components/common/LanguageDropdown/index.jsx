import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

import i18n from '../../../i18n'

// flags
import england from '~assets/images/flags/en.png'
import spain from '~assets/images/flags/es.png'
import france from '~assets/images/flags/fr.png'
import portugal from '~assets/images/flags/pt.png'

const locales = [
  {flag: england, lang: 'English', lng: 'eng'},
  {flag: spain, lang: 'Spanish', lng: 'es'},
  {flag: france, lang: 'French', lng: 'fr'},
  {flag: portugal, lang: 'Portuguese', lng: 'pt'},
]

const LanguageDropdown = () => {
  const [menu, setMenu] = useState(false)
  const [flag, setFlag] = useState(england)
  const [lng, setLng] = useState('English')

  function changeLanguage(locale) {
    console.log(locale)
    i18n.changeLanguage(locale.lng)
    setFlag(locale.flag)
    setLng(locale.lang)
  }

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className='d-inline-block'
    >
      <DropdownToggle className='btn waves-effect' tag='button'>
        <img src={flag} alt='flag' height='16' className='mr-1' />
        <span className='align-middle text-light'>{lng}</span>
      </DropdownToggle>
      <DropdownMenu right>
        {locales.map(locale => (
          <DropdownItem
            tag='a'
            href='#'
            key={locale.flag}
            onClick={() => changeLanguage(locale)}
            className='notify-item'
          >
            <img src={locale.flag} alt='flag' className='mr-1' height='12' />
            <span className='align-middle'>{locale.lang}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default LanguageDropdown
