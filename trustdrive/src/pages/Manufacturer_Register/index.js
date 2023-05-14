import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { ManufacturerContext } from "../../context/manufacturer_context";

export default function Manufacturer_Register() {
    let navigate = useNavigate();
    let manufacturer_context = useContext(ManufacturerContext);
    let manufacturer_name = useRef();
    let manufacturer_email = useRef();
    let company_name = useRef();
    let company_origin = useRef();
    let license_number = useRef();
    let license_year = useRef();
    let manufacturer_password = useRef();
    let confirm_manufacturer_password = useRef();

    return <div>
        <NavBar />
        <div className="register_box" >
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ manufacturer_name } placeholder="Manufacturer Name"/>
                <input type="text" ref={ manufacturer_email } placeholder="Manufacturer Email"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ company_name } placeholder="Company Name"/>
                <input type="text" ref={ company_origin } placeholder="Company Origin"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ license_number } placeholder="License Number"/>
                <input type="numeric" ref={ license_year } placeholder="Year of License"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ manufacturer_password } placeholder="Password"/>
                <input type="password" ref={ confirm_manufacturer_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/manufacturer/register',
                        data: {
                            manufacturer_name: manufacturer_name.current.value,
                            manufacturer_email: manufacturer_email.current.value,
                            company_name: company_name.current.value,
                            company_origin: company_origin.current.value,
                            license_number: license_number.current.value,
                            license_year: license_year.current.value,
                            manufacturer_password: manufacturer_password.current.value,
                            confirm_manufacturer_password: confirm_manufacturer_password.current.value
                        }})
                    .then(response => {
                        manufacturer_context.setName(manufacturer_name.current.value);
                        navigate("/manufacturer")
                    })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="manufacturer_register" value = "Register"/>
            </div>
        </div>
    </div>
}