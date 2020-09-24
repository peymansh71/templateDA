import React from 'react'
import {useTranslation} from 'react-i18next'

import {FormGroup, Label, FormFeedback, CustomInput} from 'reactstrap'

const FormCheck = ({
  name,
  label,
  options,
  required,
  validity,
  validationMessage,
  ...props
}) => {
  const {t} = useTranslation()

  return (
    <FormGroup>
      <Label for={name}>{label ? t(label) : ''}</Label>
      <div>
        {options.map(option => (
          <CustomInput
            id={name}
            key={option.name}
            name={option.name}
            type='checkbox'
            label={option.label}
            valid={validity}
            invalid={validity === false}
            {...props}
          />
        ))}
      </div>
      {!!validationMessage && (
        <FormFeedback>{t(validationMessage)}</FormFeedback>
      )}
    </FormGroup>
  )
}

export default FormCheck
