import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { TransporterContext } from "../../context/transporter_context";

export default function Transporter_Login() {
    let navigate = useNavigate();
    let transporter_context = useContext(TransporterContext);
    let license_number = useRef();
    let transporter_password = useRef();

    return <div>
        <NavBar />
        <div className="login_box">
            <div className="login">
                LOGIN
            </div>
            <div className="form_div">
                <input type="text" ref={ license_number } placeholder="License Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ transporter_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/transporter/login',
                        data: {
                            license_number: license_number.current.value,
                            transporter_password: transporter_password.current.value
                        }})
                        .then(response => {
                            transporter_context.setName(response.data.name);
                            navigate("/transporter")
                        })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="transporter_login" value = "Login"/>
            </div>
        </div>
    </div>
}