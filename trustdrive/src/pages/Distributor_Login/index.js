import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { DistributorContext } from "../../context/distributor_context";

export default function Distributor_Login() {
    let navigate = useNavigate();
    let distributor_context = useContext(DistributorContext);
    let gst_number = useRef();
    let distributor_password = useRef();

    return <div>
        <NavBar />
        <div className="login_box">
            <div className="login">
                LOGIN
            </div>
            <div className="form_div">
                <input type="text" ref={ gst_number } placeholder="GST Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ distributor_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/distributor/login',
                        data: {
                            gst_number: gst_number.current.value,
                            distributor_password: distributor_password.current.value
                        }})
                        .then(response => {
                            distributor_context.setName(response.data.name);
                            navigate("/distributor")
                        })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="distributor_login" value = "Login"/>
            </div>
        </div>
    </div>
}