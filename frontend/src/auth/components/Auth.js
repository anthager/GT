import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
`

export default class Auth extends Component {
  static propTypes = {}

  render() {
    return (
      <Container>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/" render={() => <div>hej</div>} />
        </Switch>
      </Container>
    )
  }
}
