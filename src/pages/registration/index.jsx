import React, {useState} from 'react'
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
} from 'reactstrap'
import Stepper from '~components/Stepper'

import styles from './styles.m.scss'

const steps = [
  'organization',
  'structure',
  'personal',
  'country_birth',
  'ethinicity_appearance',
  'language',
  'worldview',
]
const Registration = () => {
  const {t} = useTranslation()

  const [active, setActive] = useState(0)

  const next = () => setActive(active < 6 ? active + 1 : 6)
  const prev = () => setActive(active > 0 ? active - 1 : 0)

  return (
    <>
      <Helmet>
        <title>Diversity Atlas|Registration</title>
      </Helmet>
      <Container className='align-self-center'>
        <Row>
          <Col sm='12' md={{size: 10, offset: 1}}>
            <Card className={styles.registration}>
              <CardHeader className='d-flex justify-content-between'>
                <span>{t('registration')}</span>
                <span>Plan: [x] users</span>
              </CardHeader>
              <CardBody className={styles.registration__body}>
                <Stepper steps={steps} active={active} />
                <div className='ml-auto'>
                  <Button color='secondary' onClick={prev}>
                    {t('previous')}
                  </Button>
                  <Button className='ml-2' onClick={next}>
                    {t('next')}
                  </Button>
                </div>
              </CardBody>
              <CardFooter className='d-flex justify-content-between'>
                <Link className='text-white' to='/login'>
                  {`${t('already_have_an_account')} ${t('login')}`}
                </Link>
                <Link className='text-white' to='/login'>
                  {t('privacy')}
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Registration
