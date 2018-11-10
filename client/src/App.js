import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import Routes from './components/Routes';
import AddWebSite from './components/AddWebSite';

function AddNewSites(props) {
  return (
    <button onClick={props.onClick}>
      Add
    </button>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.handleNewWebsite = this.handleNewWebsite.bind(this);
    this.state = { addNewWebsite: false };
    this.closeWindow = this.closeWindow.bind(this);
  }
  handleNewWebsite() {
    this.setState({ addNewWebsite: true });
  }
  closeWindow() {
    this.setState({ addNewWebsite: false });
  }
  render() {
    var canAddNew = this.state.addNewWebsite;
    let buttons = null;
    let popup = null;
    var addSiteParam = {
      closeWindow: this.closeWindow,
      userId: this.props.userId
    };

    if (canAddNew) {
      popup = <AddWebSite params={addSiteParam} />
    }
    if (!canAddNew) {
      buttons = <AddNewSites onClick={this.handleNewWebsite} />;
    }
    return (
      <div className="App">
        <Routes />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starter</h1>
        </header>
        {buttons}
        {popup}
        <Users userId={this.props.userId} />
      </div>
    );
  }
}

export default App;
