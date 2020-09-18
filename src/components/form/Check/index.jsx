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
      <Label for={name}>{t(label)}</Label>
      <div id={name}>
        {options.map(option => (
          <CustomInput
            key={option.name}
            name={option.name}
            type='checkbox'
            label={t(option.label)}
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
