import { CardStyle } from '../../auth/components/CardStyle'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const SearchStyled = styled.input`
  border-style: none;
  font-size: 15px;
  background-color: transparent;
  text-align: center;
`

const SearchCardStyle = styled(CardStyle)`
  text-align: center;
  cursor: default;
`

export default class PlayerSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    phrase: PropTypes.string.isRequired,
  }
  render() {
    return (
      <SearchCardStyle>
        <SearchStyled
          value={this.props.phrase}
          onChange={event => this.props.onSearch(event.target.value)}
          placeholder={'search...'}
        />
      </SearchCardStyle>
    )
  }
}
