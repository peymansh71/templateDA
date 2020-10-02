import React, {useRef, useState} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import {Button, Card} from 'reactstrap'
import {useTranslation} from 'react-i18next'

import {validateEmail} from '~utils'

import FormInput from '~components/form/Input'
import FormPassword from '~components/form/Password'

import logo from '~assets/images/logo/DA_logo_color.png'

import s from './styles.m.scss'

const initialState = {email: null, password: null}

const Login = () => {
  const {t} = useTranslation()

  const formRef = useRef(null)

  const [validity, setValidity] = useState(initialState)

  const onSubmit = e => {
    e.preventDefault()

    const data = new FormData(formRef.current)

    const state = {...initialState}

    if (!validateEmail(data.get('e-mail'))) state.email = false
    else state.email = true

    if (!data.get('password')) state.password = false
    else state.password = true

    const status = Object.values(state).reduce((a, b) => a && b)

    if (status) {
      setValidity(initialState)
      return data
    }

    setValidity(state)
    return false
  }

  return (
    <>
      <Helmet>
        <title>Diversity Atlas|Login</title>
      </Helmet>
      <div className={s.login}>
        <Card className={s.login__card}>
          <div className={s.login__logo}>
            <img alt='diversity-logo' src={logo} />
          </div>
          <form ref={formRef}>
            <FormInput
              className={s.login__input}
              name='e-mail'
              label=''
              validity={validity.email}
              placeholder='johndoe@mail.com'
            />
            <FormPassword
              className={s.login__input}
              validity={validity.password}
              placeholder='password'
              label=''
            />
            <Button
              id='submit-btn'
              className={s.login__submit}
              color='secondary'
              block
              onClick={onSubmit}
            >
              {t('login')}
            </Button>
            <div className={s.login__links}>
              <Link to='/forgot-password'>{t('forget_password')}</Link>
              <div>
                <span>
                  {t('i_dont_have_an_account')}{' '}
                  <Link to='/registration'> {t('register')}.</Link>
                </span>
              </div>
            </div>
            <hr className={s.login__divider} />
            <div className={s.login_contact}>
              <Link to='/contact-us'>{t('contact_us')}</Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}

export default Login
