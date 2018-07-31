import React from 'react';
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader';
import AppNav from './AppNav'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div>
                <AppNav/>
                <div className="container-fluid">
                    <h1>Hello world!</h1>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
