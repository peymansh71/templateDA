import React from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import './styles.scss'

const STATUS = {ACTIVE: 0, COMPLETED: 1, DISABLED: -1}

const Stepper = ({steps, active}) => {
  const maxLevel = active > steps.length - 1 ? steps.length - 1 : active
  return (
    <div
      className='stepper d-flex justify-content-between'
      style={{'--length': steps.length}}
    >
      {steps.map((step, index) => {
        const lStatus = Math.sign(active - index)
        const iStatus = Math.sign(maxLevel - index)
        return (
          <div
            id={`stepper_${step}`}
            key={step}
            className={names(
              'stepper__step',
              {'stepper__step--completed': iStatus === STATUS.COMPLETED},
              {'stepper__step--active': iStatus === STATUS.ACTIVE},
              {'stepper__step--disabled': iStatus === STATUS.DISABLED},
              'd-flex flex-column align-items-center'
            )}
          >
            <Icon status={lStatus} index={index} />
            <Label status={lStatus} label={step} />
          </div>
        )
      })}
    </div>
  )
}

const Icon = ({status, index}) => {
  const className = names(
    'stepper__icon',
    {'stepper__icon--completed': status === STATUS.COMPLETED},
    {'stepper__icon--active': status === STATUS.ACTIVE},
    {'stepper__icon--disabled': status === STATUS.DISABLED},
    'd-flex align-items-center justify-content-center mb-2'
  )
  return (
    <span className={className}>
      {status === STATUS.COMPLETED ? (
        <i className='fa fa-check' />
      ) : status === STATUS.ACTIVE ? (
        <i className='fa fa-pencil-alt' />
      ) : status === STATUS.DISABLED ? (
        <span>{index + 1}</span>
      ) : null}
    </span>
  )
}

const Label = ({label, status}) => {
  const {t} = useTranslation()
  const STATUS = {ACTIVE: 0, COMPLETED: 1, DISABLED: -1}
  const className = names(
    'stepper__label',
    {'stepper__label--active': status === STATUS.ACTIVE},
    'text-center'
  )
  return <span className={className}>{t(label)}</span>
}

export default Stepper
