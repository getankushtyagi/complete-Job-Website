/* eslint-disable react-hooks/rules-of-hooks */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function authroute() {
    const navigate = useNavigate();

    //this function help to get token  whenever required 

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    //this function help to get token  whenever required 
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }


    // this will by default get token and user and update their value
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());


    //save user and token in session storage and set their value 
    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        console.log('Logout successfully');
        // navigate('/');
        useEffect(() => {
            navigate('/');
        }, []);
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/v1/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        getUser,
        http,
        logout,
    }
}

