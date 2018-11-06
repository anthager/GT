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

export default class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  pingServer = async () => {
    console.log(await Axios.get(`/api`))
  }

  handleSubmit = async event => {
    event.preventDefault()
    let res
    try {
      res = await Axios.post(`${API}/auth/login`, {
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
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <AuthInput type="text" name="name" onChange={this.handleChange} />
        <label>Password:</label>
        <AuthInput type="Password" name="password" onChange={this.handleChange} />
        <LoginButton>Login</LoginButton>
        <RegisterLink to={`/auth/register/`}>Not a user yet?</RegisterLink>
      </Form>
    )
  }
}
