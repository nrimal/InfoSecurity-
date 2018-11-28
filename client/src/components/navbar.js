import React, { Component } from 'react';
import './customers.css';

class NavigationBar extends Component {

  render() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600" 
          rel="stylesheet" />  
        <nav class="navbar navbar-default navbar-light bg-light">
        {/* <a class="navbar-brand" href="#"></a> */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>    
        </nav>
      </div>

    );
  }
}

export default NavigationBar;
