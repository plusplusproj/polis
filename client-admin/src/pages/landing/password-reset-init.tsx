// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { doPasswordResetInit } from '../../actions'

import StaticLayout from './lander-layout'

class PasswordResetInit extends React.Component<{ dispatch: Function }, {
  email: HTMLInputElement
}> {
  static propTypes: {
    dispatch: Function
  }

  handleClick(e) {
    e.preventDefault()

    const attrs = {
      email: this.state.email.value
    }

    this.props.dispatch(doPasswordResetInit(attrs))
  }

  render() {
    return (
      <StaticLayout>
        <React.Fragment>
          <h1>Password Reset</h1>
          <form>
            <input
              ref={(c) => (this.setState({ email: c }))}
              placeholder="email"
              type="text"
            />
            <button onClick={this.handleClick.bind(this)}>
              Send password reset email
            </button>
          </form>
        </React.Fragment>
      </StaticLayout>
    )
  }
}

PasswordResetInit.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(PasswordResetInit)