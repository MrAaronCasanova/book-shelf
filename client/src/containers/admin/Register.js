import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, registerUser } from './../../actions';

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  };

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  handleInputFirstname = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  handleInputLastname = e => {
    this.setState({
      lastname: e.target.value
    });
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
    this.setState({
      error: ''
    });
    this.props.dispatch(
      registerUser(
        {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password
        },
        this.props.user.users
      )
    );
  };

  showUsers = user =>
    user.users
      ? user.users.map(item => (
          <tr key={item._id}>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
          </tr>
        ))
      : null;

  render() {
    console.log(this.props.user.users);
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Add user</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter first name"
              value={this.state.firstname}
              onChange={this.handleInputFirstname}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter last name"
              value={this.state.lastname}
              onChange={this.handleInputLastname}
            />
          </div>
          <div className="form_element">
            <input
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Add user</button>
        </form>
        <div className="error">{this.state.error}</div>
        <div className="current_users">
          <h4>Current users:</h4>
          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.showUsers(user)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Register);
