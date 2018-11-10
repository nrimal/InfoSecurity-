import React, { Component } from 'react';
import './customers.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: [],
      userId: props.userId,
      copied:false
    };
  }

  componentDidMount() {
    fetch('/api/users/'+this.state.userId)
      .then(res => res.json())
      .then(websites => this.setState({websites}, () => console.log('Customers fetched...', websites)));
  }

  render() {
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
        
      </div>
    );
  }
}

export default Users;
