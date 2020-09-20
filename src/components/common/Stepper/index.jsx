import React from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import s from './styles.m.scss'

const STATUS = {ACTIVE: 0, COMPLETED: 1, DISABLED: -1}

const Stepper = ({steps, active}) => {
  const maxLevel = active > steps.length - 1 ? steps.length - 1 : active
  return (
    <div
      className={`${s.stepper} d-flex justify-content-between`}
      style={{'--length': steps.length}}
    >
      {steps.map((step, index) => {
        const lStatus = Math.sign(active - index)
        const iStatus = Math.sign(maxLevel - index)
        return (
          <div
            key={step}
            className={names(
              s.stepper__step,
              {[s['stepper__step--completed']]: iStatus === STATUS.COMPLETED},
              {[s['stepper__step--active']]: iStatus === STATUS.ACTIVE},
              {[s['stepper__step--disabled']]: iStatus === STATUS.DISABLED},
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
    s.stepper__icon,
    {[s['stepper__icon--completed']]: status === STATUS.COMPLETED},
    {[s['stepper__icon--active']]: status === STATUS.ACTIVE},
    {[s['stepper__icon--disabled']]: status === STATUS.DISABLED},
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
    s.stepper__label,
    {[s['stepper__label--active']]: status === STATUS.ACTIVE},
    'text-center'
  )
  return <span className={className}>{t(label)}</span>
}

export default Stepper
