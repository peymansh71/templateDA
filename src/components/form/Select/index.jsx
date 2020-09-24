import React from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import Select from 'react-select'

import s from './styles.m.scss'

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
]

const theme = theme => ({
  ...theme,
  borderRadius: '0.25rem;',
  colors: {
    ...theme.colors,
    neutral20: '#ddd',
    primary: '#52c9e0',
  },
})

const FormSelect = props => {
  const {
    label,
    name,
    required,
    validity,
    labelIcon,
    placeholder,
    validationMessage,
  } = props
  const {t} = useTranslation()

  const colourStyles = {
    control: styles => {
      if (validity === false) {
        styles.borderColor = 'var(--danger)'
        styles['&:hover'].borderColor = 'var(--danger)'
      } else if (validity) {
        styles.borderColor = 'var(--success)'
        styles['&:hover'].borderColor = 'var(--danger)'
      }
      return styles
    },
  }

  return (
    <div className='mb-3'>
      {!!labelIcon && <i className={`mr-2 fa ${labelIcon}`} />}
      <label htmlFor={name} className='font-weight-bold'>{` ${t(
        label ?? name
      )} :`}</label>
      {required && <span className='text-danger font-weight-bold'> *</span>}
      <Select
        id={name}
        theme={theme}
        className={s.select}
        styles={colourStyles}
        options={options}
        {...props}
        placeholder={t(placeholder)}
      />
      {!!validationMessage && (
        <span
          className={names('invalid-feedback', {'d-block': validity === false})}
        >
          {t(validationMessage)}
        </span>
      )}
    </div>
  )
}

export default FormSelect
