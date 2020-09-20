import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  CardFooter,
} from 'reactstrap'
import Stepper from '~components/common/Stepper'
import {
  Organization,
  Structure,
  Personal,
  CountryBirth,
  Ethnicity,
  Language,
  Worldview,
  Success,
} from '~components/auth/registration'

import s from './styles.m.scss'

const steps = [
  'organization',
  'structure',
  'personal',
  'country_birth',
  'ethnicity_appearance',
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
  const [active, setActive] = useState(3)

  const slidesWrapperRef = useRef(null)

  const childRef = useRef(0)

  const setHeight = useCallback(ref => {
    childRef.current = ref
    slidesWrapperRef.current.style.cssText += `;--height:${ref.offsetHeight}px;`
  }, [])

  const {length} = steps

  const goNext = () => {
    setActive(active => (active < length ? active + 1 : length))
  }
  const goPrev = () => setActive(active => (active > 0 ? active - 1 : 0))

  const onResizeWindow = useCallback(() => setHeight(childRef.current), [])

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow)
    return () => window.removeEventListener('resize', onResizeWindow)
  }, [])

  const slides = useMemo(
    () => [
      {component: Organization, props: {goNext, setHeight}},
      {component: Structure, props: {goNext, goPrev, setHeight}},
      {component: Personal, props: {goNext, goPrev, setHeight}},
      {component: CountryBirth, props: {goNext, goPrev, setHeight}},
      {component: Ethnicity, props: {goNext, goPrev, setHeight}},
      {component: Language, props: {goNext, goPrev, setHeight}},
      {component: Worldview, props: {goNext, goPrev, setHeight}},
      {component: Success, props: {setHeight}},
    ],
    []
  )

  return (
    <CardBody className={s.body}>
      <Stepper steps={steps} active={active} />
      <div className='w-100'>
        <div
          ref={slidesWrapperRef}
          style={{'--step': active}}
          className={`${s.body__slides} d-flex`}
        >
          {slides.map((slide, index) => (
            <slide.component
              isActive={index === active}
              key={slide.component.name}
              {...slide.props}
            />
          ))}
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
