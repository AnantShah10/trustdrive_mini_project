import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef } from "react";

import axios from "axios";

export default function Admin_Login() {
    let navigate = useNavigate();
    let admin_name = useRef();
    let new_admin_password = useRef();

    return <div>
        <NavBar />
        <div className="login_box">
            <div className="login">
                LOGIN
            </div>
            <div className="form_div">
                <input type="text" ref={ admin_name } placeholder="Admin Name"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ new_admin_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/admin/login',
                        data: {
                            admin_name: admin_name.current.value,
                            new_admin_password: new_admin_password.current.value
                        }})
                    .then(response => navigate("/admin_manufacturer"))
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="admin_login" value = "Login"/>
            </div>
        </div>
    </div>
}