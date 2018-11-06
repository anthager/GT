import { colorFor } from '../../utils/Colors'
import { Input } from '../../styledComponents/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => (props.disabled ? colorFor.disabledButton : props.color)};
  width: 50px;
  height: 27px;
  position: relative;
  display: inline-block;
  margin: 5px 5px;
  border-radius: 5px;
  line-height: 27px;
  top: -1px;
  cursor: pointer;
`

const CancelButton = styled(Button)`
  background-color: ${colorFor.cancelButton};
  width: 150px;
  margin: 0 5px;
`

const AddSessionContainer = styled.div`
  margin: 5px;
  text-align: center;
`

Button.defaultProps = {
  theme: {
    color: colorFor.loseButton,
  },
}

export class CardInput extends Component {
  constructor(props) {
    super(props)
    this.state = { amount: '', canSubmit: false }
  }

  onInput = event => {
    const amount = event.target.value
    if (amount && !isNaN(amount)) {
      this.setState({ amount: amount, canSubmit: true })
    } else {
      this.setState({ amount: '', canSubmit: false })
    }
  }

  onSubmitGame = async won => {
    const opponent = this.props.opponentName
    let amount = this.state.amount
    if (!amount) {
      return
    }
    if (!won) {
      amount *= -1
    }
    this.setState({ amount: '' })
    await this.props.postGame(opponent, amount)
  }
  render() {
    return (
      <AddSessionContainer>
        <Button
          color={colorFor.loseButton}
          onClick={() => this.onSubmitGame(false)}
          disabled={!this.state.canSubmit}
        >
          Lost
        </Button>
        <Input type="text" value={this.state.amount} onChange={this.onInput} />
        <Button
          color={colorFor.winButton}
          onClick={() => this.onSubmitGame(true)}
          disabled={!this.state.canSubmit}
        >
          Won
        </Button>
        <CancelButton onClick={this.props.handleCancel}>Cancel</CancelButton>
      </AddSessionContainer>
    )
  }
}

CardInput.propTypes = {
  handleCancel: PropTypes.func,
  postGame: PropTypes.func.isRequired,
  opponentName: PropTypes.string.isRequired,
}
