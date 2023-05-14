import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef } from "react";

import axios from "axios";

export default function User_Register() {
    let navigate = useNavigate();
    let user_name = useRef();
    let user_email = useRef();
    let aadhar_number = useRef();
    let user_phone_number = useRef();
    let user_password = useRef();
    let confirm_user_password = useRef();

    return <div>
        <NavBar />
        <div className="register_box" >
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ user_name } placeholder="User Name"/>
                <input type="text" ref={ user_email } placeholder="User Email"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ aadhar_number } placeholder="Aadhar Number"/>
                <input type="text" ref={ user_phone_number } placeholder="Phone Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ user_password } placeholder="Password"/>
                <input type="password" ref={ confirm_user_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/user/register',
                        data: {
                            user_name: user_name.current.value,
                            user_email: user_email.current.value,
                            aadhar_number: aadhar_number.current.value,
                            user_phone_number: user_phone_number.current.value,
                            user_password: user_password.current.value,
                            confirm_user_password: confirm_user_password.current.value
                        }})
                    .then(response => navigate("/user"))
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="user_register" value = "Register"/>
            </div>
        </div>
    </div>
}