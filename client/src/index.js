import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import { BrowserRouter } from 'react-router-dom';


class NewUser extends React.Component {
  render() {
    const newUser = this.props.newUser;
    if (newUser) {
      return (
        <div>
          <h1>Register</h1>
        </div>
      )
    }
    return null;
  }
}


function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;//pass a sign in component
}

//here login the user using civic and see if they have an account and only then
//allow them to go to App
//need to send user id so we can fetch user info from db 
//user id refers to civic id that is generated unique for each user
function App(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div>
        <MainApp userId={1} />
      </div>
    );
  } else {
    return <GuestGreeting />;
  }

}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
      </button>
  );
}
function RegisterButton(props) {
  return (
    <button onClick={props.onClick}>
      Register
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
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleNewUserClick = this.handleNewUserClick.bind(this);

    this.state = { isLoggedIn: false, newUser: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }
  handleNewUserClick() {
    this.setState({ newUser: !this.state.newUser });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const newUser = this.state.newUser;
    let buttons;

    if (isLoggedIn) {
      buttons = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      buttons = (<div>
        <LoginButton onClick={this.handleLoginClick} />
        <RegisterButton onClick={this.handleNewUserClick} />
      </div>
      )
    }

    return (
      <div>
        <App isLoggedIn={isLoggedIn} />
        <NewUser newUser={newUser} />
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

