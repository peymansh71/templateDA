import React from 'react'
import names from 'classnames'
import {useTranslation} from 'react-i18next'

import {FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap'

import s from './styles.m.scss'

const FormInput = ({
  name,
  type,
  icon,
  label,
  hint,
  required,
  disabled,
  validity,
  iconStatus,
  placeholder,
  validationMessage,
  onClickIcon = () => {},
  ...props
}) => {
  const {t} = useTranslation()

  if (disabled) validity = null

  return (
    <FormGroup className={s.input}>
      {label !== '' && (
        <Label for={name}>
          <span>{`${t(label ?? name)} :`}</span>
          {required && <span className='text-danger'> *</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type ?? name}
        valid={validity}
        disabled={disabled}
        invalid={validity === false}
        placeholder={t(placeholder ?? label ?? name)}
        {...props}
      />
      {!!icon && (
        <button
          type='button'
          className={names(s.input__icon, {
            [s['input__icon--withLabel']]: label !== '',
            [s['input__icon--inactive']]: !iconStatus,
          })}
          onClick={onClickIcon}
        >
          <i className={`fa ${icon}`} />
        </button>
      )}
      {!!hint && <FormText>{t(hint)}</FormText>}
      {!!validationMessage && (
        <FormFeedback>{t(validationMessage)}</FormFeedback>
      )}
    </FormGroup>
  )
}

export default FormInput
