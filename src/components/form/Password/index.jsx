import React, {useState} from 'react'
import FormInput from '../Input'

const FormPassword = props => {
  const [visibility, setVisibility] = useState(false)

  const onClick = () => setVisibility(!visibility)

  return (
    <FormInput
      name='password'
      type={visibility ? 'text' : 'password'}
      icon={visibility ? 'fa-eye-slash' : 'fa-eye'}
      onClickIcon={onClick}
      required
      {...props}
    />
  )
}

export default FormPassword
