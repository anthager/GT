import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CardInput } from './CardInput'
import { CardStyle } from '../../auth/components/CardStyle'
import { colorFor } from '../../utils/Colors'

const Amount = styled.span`
  float: right;
`

export default class OpponentCard extends Component {
  render() {
    const cardInput = this.props.isSelected ? (
      <CardInput
        handleCancel={this.props.handleCancel}
        postGame={this.props.postGame}
        opponentName={this.props.name}
      />
    ) : (
      undefined
    )
    const amount = this.props.amount ? <Amount>{this.props.amount} kr</Amount> : undefined
    const color = this.props.amount ? colorFor.card : colorFor.searchCard
    return (
      <CardStyle
        onClick={this.props.handleClick}
        toggled={this.props.isSelected}
        center={!this.props.amount}
        bgColor={color}
      >
        <span>{this.props.name}</span>
        {amount}
        {cardInput}
      </CardStyle>
    )
  }
}

OpponentCard.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  postGame: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func,
  handleCancel: PropTypes.func,
}
