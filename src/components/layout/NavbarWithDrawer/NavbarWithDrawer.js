import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import DrawerToggleButton from '../Drawer/DrawerToggleButton';
import Drawer from '../Drawer/Drawer';
import Backdrop from '../Backdrop/Backdrop';

import './NavbarWithDrawer.css';
//import getWeb3 from "../../Dashboard/getWeb3";
import Web3 from "web3";

const HeaderLogo = require('../../../assets/images/Logo.png');
const connectmetamask = async () => {
    console.log("test");
    if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(accounts);
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            console.log("erreur");
          }
      
          
        }
      }
} 

class NavbarWithDrawer extends Component {
    state = {
        isDrawerOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(prevState => ({ isDrawerOpen: !prevState.isDrawerOpen }));
    };

    handleBackdropClick = () => {
        this.setState({
            isDrawerOpen: false
        });
    };

    render() {
        let backdrop;

        if (this.state.isDrawerOpen) {
            backdrop = <Backdrop handleBackdropClick={this.handleBackdropClick} />;
        }
        return (
            <>
                <header className="navbar">
                    <nav className="navbar-navigation container">
                        <NavLink to="/dashboard" className="logo" style={{ cursor: 'pointer' }}>
                            <img src={HeaderLogo} alt="logo" className="header-logo" />
                        </NavLink>
                        
                        <div className="spacer" />
                        <button class="enableEthereumButton" onClick={connectmetamask}>Enable Blockchain</button>
                        <div>
                            <DrawerToggleButton handleDrawerToggle={this.handleDrawerToggle} />
                        </div>
                    </nav>
                </header>
                <Drawer
                    show={this.state.isDrawerOpen}
                    handleBackdropClick={this.handleBackdropClick}
                    handleDrawerToggle={this.handleDrawerToggle}
                />
                {backdrop}
            </>
        );
    }
}

export default NavbarWithDrawer;
