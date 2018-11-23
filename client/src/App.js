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
      <div className="App">
        <Routes />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        <Users userId={this.props.userId} />
      </div>
    );
  }
}

export default App;
