import React, { Component } from 'react';
import './addWebSite.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { website: '', username: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ website: event.target.website });
        this.setState({ username: event.target.username });
        this.setState({ password: event.target.password });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { closeWindow } = this.props;
        closeWindow();
    }
    render() {

        return (

            <div className="popup">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Website Name:
          <input type="text" value={this.state.website} onChange={this.handleChange} />
                    </label>
                    <label>
                        Username:
          <input type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
          <input type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}


export default Registration;
