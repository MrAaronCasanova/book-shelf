import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Sidenav from './sidenav/Sidenav';

class Header extends Component {
  state = {
    showNav: false
  };

  onHideNav = () => {
    this.setState({ showNav: false });
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            style={{ color: '#fff', padding: '10px', cursor: 'pointer' }}
            onClick={() => this.setState({ showNav: true })}
          />
        </div>
        <Sidenav
          showNav={this.state.showNav}
          onHideNav={() => this.onHideNav()}
        />
        <Link to="/" className="logo">
          The Book Shelf
        </Link>
      </header>
    );
  }
}

export default Header;
