import React, { Component } from 'react'
import './App.css'
import Home from './home/Home'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from './auth/helpers/PrivateRoute'
import Auth from './auth/components/Auth'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/home" component={Home} />
          <Route path="/">
            <Redirect to={{ pathname: '/home' }} />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
