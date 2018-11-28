import React, { Component } from 'react';
import './customers.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddWebSite from './AddWebSite';

function AddNewSites(props) {
  return (
    <button onClick={props.onClick} className="btn btn-success mt-2 mr-2">
      Add
    </button>
  )
}

function Remove(props) {
  return (
    <button type="button" className="btn btn-danger" onClick={props.onClick}>
      Remove
    </button>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: [],
      userId: props.userId,
      copied: false,
      addNewWebsite: false
    };
    this.handleNewWebsite = this.handleNewWebsite.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

  }
  handleNewWebsite() {
    this.setState({ addNewWebsite: true });
  }

  closeWindow() {
    this.setState({ addNewWebsite: false });
  }

  componentDidMount() {
    fetch('/api/users/' + this.state.userId)
      .then(res => res.json())
      .then(websites => this.setState({ websites }, () => console.log('Customers fetched...', websites)));
  }

  handleRemove(website_name) {
    fetch('/api/delete/website', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
        website_name: website_name
      })
    }).then(() => {
      fetch('/api/users/' + this.state.userId)
      .then(res => res.json())
      .then(websites => this.setState({ websites }, () => console.log('Customers fetched...', websites)));
    });
  }

  render() {
    var canAddNew = this.state.addNewWebsite;
    let buttons = null;
    let popup = null;

    var addSiteParam = {
      closeWindow: this.closeWindow,
      userId: this.props.userId,
      websites: this.state.websites
    };
    if (canAddNew) {
      popup = <AddWebSite params={addSiteParam} />
    }
    if (!canAddNew) {
      buttons = <AddNewSites onClick={this.handleNewWebsite} />;
    }

    return (
      <div className="html-center">
        <table>
          <thead>
            {/* <h2>{this.state.userId}</h2> */}
            <tr>
              <th>Website Name</th>
              <th>User Name</th>
              <th>Password</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.websites.map(website =>
              <tr key={website.website_name}>
                <td>{website.website_name}</td>
                <td>{website.user_name}</td>
                <td>
                  <input value={website.password} type="password" ></input>
                  <CopyToClipboard text={website.password}>
                    <button className="btn btn-success ml-2">Copy</button>
                  </CopyToClipboard>
                </td>
                <td>
                  <Remove onClick={() => this.handleRemove(website.website_name)}></Remove>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="float-right">{buttons}</div>
        <div className="mt-5">{popup}</div>
      </div>
    );
  }
}

export default Users;
