import React from 'react'
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
  placeholder,
  validationMessage,
  onClickIcon = () => {},
  ...props
}) => {
  const {t} = useTranslation()

  if (disabled) validity = null

  return (
    <FormGroup className={s.input}>
      <Label for={name}>
        <span>{`${t(label ?? name)} :`}</span>
        {required && <span className='text-danger'> *</span>}
      </Label>
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
        <button type='button' className={s.input__icon} onClick={onClickIcon}>
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
