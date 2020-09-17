import React from 'react'
import {useTranslation} from 'react-i18next'
import names from 'classnames'

import styles from './styles.m.scss'

const Stepper = ({steps, active}) => {
  return (
    <div
      className={`${styles.stepper} d-flex justify-content-between`}
      style={{'--step': active}}
    >
      <div
        className={`${styles.stepper__divider} ${styles['stepper__divider--active']}`}
      />
      {steps.map((step, index) => (
        <div
          key={step}
          className={`${styles.stepper__step} d-flex flex-column align-items-center`}
        >
          <Icon status={Math.sign(active - index)} index={index} />
          <Label status={Math.sign(active - index)} label={step} />
        </div>
      ))}
      <div
        className={`${styles.stepper__divider} ${styles['stepper__divider--disabled']}`}
      />
    </div>
  )
}

const Icon = ({status, index}) => {
  const STATUS = {ACTIVE: 0, COMPLETED: 1, DISABLED: -1}
  const className = names(
    styles.stepper__icon,
    {[styles['stepper__icon--completed']]: status === STATUS.COMPLETED},
    {[styles['stepper__icon--active']]: status === STATUS.ACTIVE},
    {[styles['stepper__icon--disabled']]: status === STATUS.DISABLED},
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
    styles.stepper__label,
    {[styles['stepper__label--active']]: status === STATUS.ACTIVE},
    'text-center'
  )
  return <span className={className}>{t(label)}</span>
}

export default Stepper
