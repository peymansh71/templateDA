import React from 'react'

import {Row, Col, CardBody, Card, Alert, Container} from 'reactstrap'

// Redux
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

// availity-reactstrap-validation

// actions

const Login = props => {
  // handleValidSubmit

  return (
    <React.Fragment>
      <div className='login-page '>asdasd</div>
    </React.Fragment>
  )
}

const mapStatetoProps = state => {
  const {error} = state.Login
  return {error}
}

export default withRouter(
  connect(mapStatetoProps, {loginUser, apiError})(Login)
)
