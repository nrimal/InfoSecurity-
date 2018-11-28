import React, { Component } from 'react';
import './customers.css';

class InformationText extends Component {

  render() {
    return (
      <div className='info'>
        <h2>What is Civic Password Manager?</h2>
        <p>
          Civic Password Manager is a web application designed to 
          securely store passwords with the power of blockchain.
          By using Civic authorization and identification, users 
          never need to memorize a password again. All
          passwords are stored safely on our database,
          and users can access passwords with ease.
          
        </p>
        <h2>How do I use the Password Manager?</h2>
        <ul id="howToList">
          <li>Download the Civic App</li>
          <li>Click the login button and scan the QR code</li>
          <li>Authorize Password Manager on your mobile device</li>
        </ul>
      </div>

    );
  }
}

export default InformationText;
