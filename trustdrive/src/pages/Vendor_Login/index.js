import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { VendorContext } from "../../context/vendor_context";

export default function Vendor_Login() {
    let navigate = useNavigate();
    let vendor_context = useContext(VendorContext);
    let gst_number = useRef();
    let vendor_password = useRef();

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
                <input type="password" ref={ vendor_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/vendor/login',
                        data: {
                            gst_number: gst_number.current.value,
                            vendor_password: vendor_password.current.value
                        }})
                        .then(response => {
                            vendor_context.setName(response.data.name);
                            navigate("/vendor")
                        })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="vendor_login" value = "Login"/>
            </div>
        </div>
    </div>
}