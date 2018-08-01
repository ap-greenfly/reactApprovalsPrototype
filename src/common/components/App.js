import React from 'react';
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import AppNav from './AppNav';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';
import ApprovalsListPage from '../../approvals/components/ListPage';
import ApprovalsDetailPage from '../../approvals/components/DetailPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div>
                <AppNav/>
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/approvals/list/:type" component={ApprovalsListPage}/>
                        <Route path="/approvals/:id/details" component={ApprovalsDetailPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
