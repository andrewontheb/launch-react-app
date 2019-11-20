import React from 'react';
import logo from "../logo.svg";
import {NavLink} from "react-router-dom";

const toggleNav = (): void => {
    let burger = document.querySelector('.nav-toggle') as HTMLElement;
    let navList = document.querySelector('.nav-list') as HTMLElement;
    burger.classList.toggle('opened');
    navList.classList.toggle('opened');
};

const Header = () => {
    return (<header className="App-header">
        <div className="App-header__logo">
            <a href="https://reactjs.org/docs">
                <img src={logo}  alt="logo" />
            </a>
        </div>
        <button type="button" className="nav-toggle" onClick={toggleNav}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <ul className="App-header__menu-list nav-list">
            <NavLink className="App-header__menu-list--item nav-list__item " activeClassName="active" onClick={toggleNav}  to="/images">Find images</NavLink>
            <NavLink className="App-header__menu-list--item nav-list__item " activeClassName="active" onClick={toggleNav} to="/rest">REST API request</NavLink>
            <NavLink className="App-header__menu-list--item nav-list__item " activeClassName="active" onClick={toggleNav} to="/gql">GraphQl API requests</NavLink>
        </ul>
    </header>);
};

export default Header;
