import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import SignUpForm from './routes/SignUpForm';
import SignInForm from './routes/SignInForm';
import '../../css/LogIn.css';
import { connect } from 'react-redux';
const Logo = require('../../../src/assets/images/logo@4x.png');



class LogIn extends Component {
    render() {
        return (
            <Router>
                <div className="LogIn">
                    <div className="LogIn-Aside">
                        <div className="LogoLogin">
                            <img src={Logo} />
                        </div>
                    </div>

                    <div className="LogIn-Form">
                        <div className="PageSwitcher">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="PageSwitcher-Item-Active"
                                className="PageSwitcher-Item"
                            >
                                Sign In
                            </NavLink>

                            <NavLink
                                exact
                                to="/sign-up"
                                activeClassName="PageSwitcher-Item-Active"
                                className="PageSwitcher-Item"
                            >
                                Sign Up
                            </NavLink>
                        </div>

                        <div className="FormTitle">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="FormTitle-Link-Active"
                                className="FormTitle-Link"
                            >
                                Sign In
                            </NavLink>{' '}
                            or{' '}
                            <NavLink
                                exact
                                to="/sign-up"
                                activeClassName="FormTitle-Link-Active"
                                className="FormTitle-Link"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                        <Switch>
                            <Route path="/sign-up" component={SignUpForm} />

                            <Route path="/" component={SignInForm} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {};
};

export default connect(mapStateToProps)(LogIn);
