import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colorFor } from './utils/Colors'

const StyledHeader = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 100px;
  justify-content: end;
`

const Logout = styled(Link)`
  justify-self: center;
  align-self: center;
	color: ${colorFor.text}
  text-decoration: none;
  cursor: pointer;
`

export default class Header extends Component {
  static propTypes = {
    logout: PropTypes.func,
  }

  render() {
    return (
      <StyledHeader>
        <Logout to={'/auth/login'} onClick={this.props.logout}>
          Log out
        </Logout>
      </StyledHeader>
    )
  }
}
