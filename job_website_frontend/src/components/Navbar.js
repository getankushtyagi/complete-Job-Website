/* eslint-disable array-callback-return */

import React from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../common/nav';
import authroute from '../common/authroute';

const logo = {
    blockSize: "45px"
};

export default function Navbar() {

    const { user, getToken } = authroute();
    var usersession = sessionStorage.getItem('user')
    const user_detail = JSON.parse(usersession);
    // console.log('userrole',user_detail.role);
    const checkIfShow = (item) => {
        switch (item.pathname) {
            case '/': return true
            case '/about': return true
            case '/signin': return Boolean(getToken()) ? false : true
            case '/signup': return Boolean(getToken()) ? false : true
            case '/dashboard': return Boolean(getToken()) ? true : false
            case '/logout': return Boolean(getToken()) ? true : false
            case '/myjobs': return (Boolean(getToken()) && (user_detail.role === 2)) ? true : false
            case '/jobs': return (Boolean(getToken()) && (user_detail.role === 0)) ? true : false

            default:
        }
    }

    return (
        <div className="contain">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"><img src="/logo.png" alt="" style={logo} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mx-3" >
                            {nav.map((item, index) => {
                                if (checkIfShow(item)) {
                                    return <Link to={item.pathname} key={index} style={{ marginLeft: '20px', marginRight: '20px', color: "white" }} >{item.name} </Link>
                                }

                            }
                            )}
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}
