import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../../actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: false
  };

  handleInputEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleInputPassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  };

  render() {
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>
          <div className="form_element">
            <input
              type="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);
