import React, { Component } from 'react';
import './addWebSite.css';

class AddWebSite extends Component {
    constructor(props) {
        super(props);
        this.state = { websiteName: '', username: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        var value = event.target.name;
        switch (value) {
            case "websiteName":
                this.setState({ websiteName: event.target.value });
                break;
            case "username":
                this.setState({ username: event.target.value });
                break;
            case "password":
                this.setState({ password: event.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var objToSend = {
            website_name: this.state.websiteName,
            user_name: this.state.username,
            password: this.state.password,
            userId: this.props.params.userId
        };
        fetch('/api/addnewvalues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objToSend)
        });
        this.props.params.websites.push(objToSend);
        this.props.params.closeWindow();
        // closeWindow();
    }
    render() {

        return (
            <div className="popup">
                <form className="addSiteForm" onSubmit={this.handleSubmit}>
                    <label>
                        Website Name:
          <input className="addSiteInput" type="text" name="websiteName" value={this.state.websiteName} onChange={this.handleChange} />
                    </label>
                    <label>
                        Username:
          <input className="addSiteInput" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
          <input className="addSiteInput" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input id="submit" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}









export default AddWebSite;
