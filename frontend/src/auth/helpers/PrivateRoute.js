import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthed } from './AuthHelpers'

// export const PrivateRoute = ({ component: Comp, ...rest }) => (
//   <Route
//     {...rest}
//     render={async props =>
//       (await isAuthed()) ? <Comp {...props} /> : <Redirect to={{ pathname: '/auth/login' }} />
//     }
//   />
// )

// make some kind of loading indicatior until isauthed is done

export class PrivateRoute extends Component {
  constructor(props) {
    super(props)
    this.state = { authed: undefined }
  }

  componentDidMount = () => {
    isAuthed().then(res => {
      this.setState({ authed: res })
    })
  }

  render() {
    const authed = this.state.authed
    if (authed === undefined) {
      return <div>Loading</div>
    } else if (authed) {
      return <this.props.component />
    } else {
      return <Redirect to={{ pathname: `/auth/login` }} />
    }
  }
}
