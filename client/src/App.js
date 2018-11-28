import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import Routes from './components/Routes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="App">
          <Routes />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Your Passwords</h1>
          </header>
          <Users userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default App;
