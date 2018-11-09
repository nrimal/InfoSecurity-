import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = () => <h2>Home</h2>;//show all the website that it has saved password from
const Edit = () => <h2>About</h2>;//call component to edit exisiting website password
const Add = () => <h2>Users</h2>;//call component to add new website(a forum)


class Main extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <Switch>
                    <Route path='/Edit' component={Edit} />
                    <Route path='/Add' component={Add} />
                </Switch>
            </main>
        );
    }
}

export default Main