import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef } from "react";

import axios from "axios";

export default function User_Login() {
    let navigate = useNavigate();
    let aadhar_number = useRef();
    let user_password = useRef();

    return <div>
        <NavBar />
        <div className="login_box">
            <div className="login">
                LOGIN
            </div>
            <div className="form_div">
                <input type="text" ref={ aadhar_number } placeholder="Aadhar Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ user_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/user/login',
                        data: {
                            aadhar_number: aadhar_number.current.value,
                            user_password: user_password.current.value
                        }})
                    .then(response => navigate("/user"))
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="user_login" value = "Login"/>
            </div>
        </div>
    </div>
}