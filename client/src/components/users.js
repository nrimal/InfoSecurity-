import React, { Component } from 'react';
import './customers.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddWebSite from './AddWebSite';

function AddNewSites(props) {
  return (
    <button onClick={props.onClick}>
      Add
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
          {/* <h2>{this.state.userId}</h2> */}
          <tr>
            <th>Website Name</th>
            <th>User Name</th>
            <th>Password</th>
          </tr>
          {this.state.websites.map(website =>
            <tr key={website.website_name}>
              <th>  {website.website_name}  </th>
              <th>{website.user_name}</th>
              <th>
                <input value={website.password} type="password" ></input>
                <CopyToClipboard text={website.password}>
                  <button>Copy to clipboard with button</button>
                </CopyToClipboard>
              </th>
            </tr>
          )}
        </table>
        {buttons}
        {popup}

      </div>
    );
  }
}

export default Users;
