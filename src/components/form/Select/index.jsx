import React from 'react'
import {useTranslation} from 'react-i18next'

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
  const {label, name, required} = props
  const {t} = useTranslation()

  const colourStyles = {
    control: styles => {
      if (props.validity === false) styles.borderColor = 'var(--danger)'
      if (props.validity === true) styles.borderColor = 'var(--success)'
      return styles
    },
  }

  return (
    <>
      <span className='font-weight-bold'>{`${t(label ?? name)} :`}</span>
      {required && <span className='text-danger font-weight-bold'> *</span>}
      <Select
        className='mt-2'
        theme={theme}
        styles={colourStyles}
        options={options}
        {...props}
      />
    </>
  )
}

export default FormSelect
