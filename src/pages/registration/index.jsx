import React, {useState, useRef} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  Container,
  CardHeader,
  CardFooter,
  CustomInput,
} from 'reactstrap'
import Stepper from '~components/common/Stepper'
import Organization from '~components/auth/registration/Organization'

import s from './styles.m.scss'

const steps = [
  'organization',
  'structure',
  'personal',
  'country_birth',
  'ethinicity_appearance',
  'language',
  'worldview',
]
const Registration = () => (
  <>
    <Helmet>
      <title>Diversity Atlas|Registration</title>
    </Helmet>
    <Container className='align-self-center'>
      <Row>
        <Col sm='12' md={{size: 10, offset: 1}}>
          <Card className={s.registration}>
            <Header />
            <Body />
            <Footer />
          </Card>
        </Col>
      </Row>
    </Container>
  </>
)

const Header = () => {
  const {t} = useTranslation()

  return (
    <CardHeader className='d-flex justify-content-between'>
      <span>{t('registration')}</span>
      <span>Plan: [x] users</span>
    </CardHeader>
  )
}

const Body = () => {
  const {t} = useTranslation()

  const organizationRef = useRef(null)

  const [active, setActive] = useState(0)
  const [agreement, setAgreement] = useState(false)

  const next = () => {
    if (active < 6) {
      const status = organizationRef.current()
      if (status) setActive(active + 1)
    }
  }
  const prev = () => setActive(active > 0 ? active - 1 : 0)

  console.log(2222222, agreement)
  return (
    <CardBody className={s.body}>
      <Stepper steps={steps} active={active} />
      <Organization ref={organizationRef} />
      <div className='mt-5 d-flex justify-content-between align-items-start px-3'>
        <CustomInput
          type='checkbox'
          id='privacyPolicy'
          name='privacyPolicy'
          checked={agreement}
          onChange={e => setAgreement(e.target.checked)}
          label={
            <span className='custom-control-label' htmlFor='privacyPolicy'>
              {t('read&agree')}
              <Link to='/privacy-policy'>{t('read&agree')}</Link>
              {t('and')}
              <Link to='/code-of-conduct'>{t('codeConduct')}</Link>
            </span>
          }
        />
        <div className='d-flex justify-content-between'>
          {active > 0 && (
            <Button className={s.body__prev} color='dark' onClick={prev}>
              <i className='fa fa-chevron-left mr-2' />
              {t('previous')}
            </Button>
          )}
          <Button className='ml-3' onClick={next}>
            {active > 0 ? t('survey') : t('next')}
            <i className='fa fa-chevron-right ml-2' />
          </Button>
        </div>
      </div>
    </CardBody>
  )
}

const Footer = () => {
  const {t} = useTranslation()

  return (
    <CardFooter className='d-flex justify-content-between'>
      <Link className='text-white' to='/login'>
        {`${t('already_have_an_account')} ${t('login')}`}
      </Link>
      <Link className='text-white' to='/privacy-policy'>
        {t('privacy')}
      </Link>
    </CardFooter>
  )
}

export default Registration
