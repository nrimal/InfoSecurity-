import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import { BrowserRouter } from 'react-router-dom';

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function App(props) {
  const isLoggedIn = props.isLoggedIn;
  const userId = props.userId;
  if (isLoggedIn) {
    return (
      <div>
        <MainApp userId={userId} />
      </div>
    );
  } else {
    return <GuestGreeting />;
  }
}

function LoginButton(props) {
  return (
    <button id="loginButton" className="civic-button" type="button" onClick={props.onClick}>
      <span>Log in with Civic</span>
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.civicSip = new window.civic.sip({ appId: 'IhZJODaBT' });
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = { isLoggedIn: false, userId: 0 };
  }

  componentDidMount() {
    var that = this;
    this.civicSip.on('auth-code-received', function (event) {
      fetch('/api/sendAuth/'+ event.response, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      }).then(res => res.json())
      .then(userId => {
        that.setState({ isLoggedIn: true, userId: userId });
      })
    });
  }

  handleLoginClick() {
    this.civicSip.signup({ style: 'popup', scopeRequest: this.civicSip.ScopeRequests.BASIC_SIGNUP });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userId = this.state.userId;
    let buttons;

    if (isLoggedIn) {
      buttons = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      buttons = (<div>
        <LoginButton onClick={this.handleLoginClick} />
      </div>
      )
    }

    return (
      <div>
        <App isLoggedIn={isLoggedIn} userId={userId}/>
        {buttons}
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <LoginControl />
  </BrowserRouter>,
  document.getElementById('root'));

