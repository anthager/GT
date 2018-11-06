import OpponentCard from './OpponentCard'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import PlayerSearch from './PlayerSearch'

const ListStyle = styled.div``

export default class List extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    postGame: PropTypes.func.isRequired,
    content: PropTypes.array,
    cardColor: PropTypes.string,
    searchPhrase: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = { selected: undefined }
  }

  handleCardClick = id => {
    if (this.state.selected === undefined) {
      this.setState({ selected: id })
    }
  }

  handleCardCancel = () => {
    this.setState({ selected: undefined })
  }

  handlePost = (opponent, amount) => {
    this.setState({ selected: undefined })
    this.props.postGame(opponent, amount)
  }

  renderList() {
    const content = this.props.content
    if (content) {
      return content.map((item, i) => (
        <OpponentCard
          key={item.name}
          name={item.name}
          amount={item.amount}
          isSelected={this.state.selected === i}
          handleClick={() => this.handleCardClick(i)}
          handleCancel={() => this.handleCardCancel()}
          postGame={this.handlePost}
        />
      ))
    } else {
      return <div>No content yet</div>
    }
  }

  render() {
    return (
      <ListStyle>
        {this.props.searchPhrase !== undefined ? (
          <PlayerSearch onSearch={this.props.onSearch} phrase={this.props.searchPhrase} />
        ) : (
          undefined
        )}

        {this.renderList()}
      </ListStyle>
    )
  }
}
