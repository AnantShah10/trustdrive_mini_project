import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef } from "react";

import axios from "axios";

export default function Admin_Register() {
    let navigate = useNavigate();
    let admin_name = useRef();
    let registered_admin_password = useRef();
    let new_admin_password = useRef();
    let confirm_new_admin_password = useRef();

    return <div>
        <NavBar />
        <div className="register_box" >
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ admin_name } placeholder="Admin Name"/>
                <input type="text" ref={ registered_admin_password } placeholder="Registered Admin Password"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ new_admin_password } placeholder="Password"/>
                <input type="password" ref={ confirm_new_admin_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/admin/register',
                        data: {
                            admin_name: admin_name.current.value,
                            registered_admin_password: registered_admin_password.current.value,
                            new_admin_password: new_admin_password.current.value,
                            confirm_new_admin_password: confirm_new_admin_password.current.value
                        }})
                    .then(response => navigate("/admin_manufacturer"))
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="admin_register" value = "Register"/>
            </div>
        </div>
    </div>
}