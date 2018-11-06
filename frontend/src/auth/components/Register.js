import { Button } from '../../styledComponents/Button'
import { Form } from '../../styledComponents/Form'
import { Input } from '../../styledComponents/Input'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { API } from '../../utils/Variables'
const LoginButton = styled(Button)``

const AuthInput = styled(Input)``

const RegisterLink = styled(Link)`
  font-size: 15px;
  display: block;
  position: relative;
  bottom: -2px;
`

const FailedLabel = styled.label`
  color: ${props => (props.failed ? 'red' : 'black')};
`

export default class Register extends Component {
  static propTypes = {
    history: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.password === this.state.password2) {
      let res
      try {
        res = await Axios.post(`${API}/auth/register`, {
          name: this.state.name,
          password: this.state.password,
        })
        if (res.status === 200) {
          localStorage.setItem('jwt', res.data)
          this.props.history.push('/home')
        }
      } catch (err) {
        this.setState({ failedAccess: true })
      }
    } else {
      this.setState({ failed: 'true' })
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <AuthInput type="text" name="name" onChange={this.handleChange} />
        <FailedLabel failed={this.state.failed}>Password:</FailedLabel>
        <AuthInput type="Password" name="password" onChange={this.handleChange} />
        <FailedLabel failed={this.state.failed}>Re-enter Password:</FailedLabel>
        <AuthInput type="Password" name="password2" onChange={this.handleChange} />
        <LoginButton>Register</LoginButton>
        <RegisterLink to={`/auth/login/`}>Already a user?</RegisterLink>
      </Form>
    )
  }
}
