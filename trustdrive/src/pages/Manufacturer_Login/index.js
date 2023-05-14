import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { ManufacturerContext } from "../../context/manufacturer_context";

export default function Manufacturer_Login() {
    let navigate = useNavigate();
    let manufacturer_context = useContext(ManufacturerContext);
    let license_number = useRef();
    let manufacturer_password = useRef();

    return <div className="manufacturer_component">
        <NavBar />
        <div className="login_box">
            <div className="login">
                LOGIN
            </div>
            <div className="form_div">
                <input type="text" ref={ license_number } placeholder="License Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ manufacturer_password } placeholder="Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/manufacturer/login',
                        data: {
                            license_number: license_number.current.value,
                            manufacturer_password: manufacturer_password.current.value
                        }})
                    .then(response => {
                        manufacturer_context.setName(response.data.name);
                        navigate("/manufacturer")
                    })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="manufacturer_login" value = "Login"/>
            </div>
        </div>
    </div>
}