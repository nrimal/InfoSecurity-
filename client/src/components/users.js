import React, { Component } from 'react';
import './customers.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      userId: props.userId,
      copied:false
    };
  }

  componentDidMount() {
    fetch('/api/customers/'+this.state.userId)
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }
//   <input value={this.state.value}
//   onChange={({target: {value}}) => this.setState({value, copied: false})} />

// <CopyToClipboard text={this.state.value}
// onCopy={() => this.setState({copied: true})}>
// <button>Copy to clipboard with button</button>
// </CopyToClipboard>


  render() {
    return (
      <div>
        <h2>Customers {this.state.userId}</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.firstName}
          <input value={customer.lastName} type="password" onChange={()=>{
            {}}}></input>
          <CopyToClipboard text={customer.lastName}>
          <button>Copy to clipboard with button</button>
          </CopyToClipboard>
          </li> 
        )}
        </ul>
      </div>
    );
  }
}

export default Users;
