import React from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import Select from 'react-select'

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
  const {label, labelIcon, name, required, validationMessage, validity} = props
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
      {!!labelIcon && <i className={`fa ${labelIcon}`} />}
      <span className='font-weight-bold'>{` ${t(label ?? name)} :`}</span>
      {required && <span className='text-danger font-weight-bold'> *</span>}
      <Select
        className='mt-2'
        theme={theme}
        styles={colourStyles}
        options={options}
        {...props}
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
