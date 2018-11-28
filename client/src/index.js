import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/navbar'
import InformationText from './components/info';

function GuestGreeting(props) {
  return (
  <div>
    <div className="header">
      <h1>Password Manager</h1> 
      <h4>powered by Civic</h4>
    </div>
  </div>
  );//pass a sign in component
  //NEW VERSION: return <h1>Please sign up.</h1>;
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
      <span>Authorize with Civic</span>
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick} className="civic-button">
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
      });
    });
  }

  handleLoginClick() {
    //this.civicSip.signup({ style: 'popup', scopeRequest: this.civicSip.ScopeRequests.BASIC_SIGNUP });
    this.setState({ isLoggedIn: true, userId: '6a03f72bc09711b596285f6ca7c3ece07a58026a7a1f5c8ddfac52a18fbb46db' });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userId = this.state.userId;
    let buttons;
    let info;

    if (isLoggedIn) {
      buttons = <LogoutButton onClick={this.handleLogoutClick} />;
      info = <div></div>;
    } else {
      buttons = (<div>
        <LoginButton onClick={this.handleLoginClick} />
      </div>
      );
      info = <InformationText />
    }

    return (
      
      <div>
        <div>
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600" rel="stylesheet" />  
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        </div>

        <NavigationBar />
        <App isLoggedIn={isLoggedIn} userId={userId} />
        {/* <NewUser newUser={newUser} /> */}
        <div className="login">{buttons}</div>
        {info}
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <LoginControl />
  </BrowserRouter>,
  document.getElementById('root'));

