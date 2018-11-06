import React, { Component } from 'react'
import styled from 'styled-components'
import List from './opponentsList/OpponentsList'
import Axios from 'axios'
import Header from '../Header'
import { api } from '../utils/Variables'

const Container = styled.div`
  margin: 10px;
  display: Grid;
  grid-gap: 10px;
  grid-template-columns: 300px repeat(2, 1fr);
  grid-template-rows: 5rem;
  grid-template-areas:
    'header header header'
    'list graph graph';
  grid-auto-rows: 280px;
`

const ListStyle = styled.div`
  grid-area: list;
`

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { searchPhrase: '', players: [], opponents: [], content: [] }
  }

  componentDidMount = async () => {
    this.getOpponents()
    this.getPlayers()
  }

  async getOpponents() {
    const jwt = localStorage.getItem('jwt')
    try {
      const res = await Axios.get(`${api}/restricted/players/opponents`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      const opponents = res.data.map(opponent => ({
        name: opponent.player.name,
        amount: opponent.amount,
        id: opponent.player.id,
      }))
      this.setState({ opponents: opponents })
      this.setState({ content: opponents })
    } catch (err) {
      console.error(err)
    }
  }

  async getPlayers() {
    const jwt = localStorage.getItem('jwt')
    try {
      const res = await Axios.get(`${api}/restricted/players/all`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      this.setState({ players: res.data })
    } catch (err) {
      console.error(err)
    }
  }

  postGame = async (opponentName, amount) => {
    const jwt = localStorage.getItem('jwt')
    try {
      await Axios.post(
        `${api}restricted/games/new`,
        {
          opponent: { name: opponentName },
          amount: amount,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      )
      this.getOpponents()
      this.getPlayers()
      this.resetSearch()
    } catch (err) {
      console.error(err)
    }
  }

  resetSearch() {
    const opponents = this.state.opponents
    this.setState({ searchPhrase: '' })
    this.setState({ content: opponents })
  }

  onSearch = async phrase => {
    this.setState({ searchPhrase: phrase })
    const opponents = this.state.opponents
    if (!phrase.length) {
      this.setState({ content: opponents })
      return
    }
    const players = this.state.players
    const result = players.filter(player => {
      return player.name.indexOf(phrase) !== -1
    })
    this.setState({ content: result })
  }

  logout = () => {
    localStorage.removeItem('jwt')
  }

  render() {
    const content = this.state.content
    return (
      <Container>
        <Header logout={this.logout} />
        <ListStyle>
          <List
            content={content}
            onSearch={this.onSearch}
            postGame={this.postGame}
            searchPhrase={this.state.searchPhrase}
          />
        </ListStyle>
      </Container>
    )
  }
}
