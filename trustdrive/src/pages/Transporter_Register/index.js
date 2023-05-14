import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { TransporterContext } from "../../context/transporter_context";

export default function Transporter_Register() {
    let navigate = useNavigate();
    let transporter_context = useContext(TransporterContext);
    let transporter_name = useRef();
    let transporter_email = useRef();
    let company_name = useRef();
    let mode_of_transportation = useRef();
    let license_number = useRef();
    let license_year = useRef();
    let transporter_password = useRef();
    let confirm_transporter_password = useRef();

    return <div>
        <NavBar />
        <div className="register_box">
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ transporter_name } placeholder="Transporter Name"/>
                <input type="text" ref={ transporter_email } placeholder="Transporter Email"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ company_name } placeholder="Company Name"/>
                <input type="text" ref={ mode_of_transportation } placeholder="Mode of Transport"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ license_number } placeholder="License Number"/>
                <input type="numeric" ref={ license_year } placeholder="Year of License"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ transporter_password } placeholder="Password"/>
                <input type="password" ref={ confirm_transporter_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/transporter/register',
                        data: {
                            transporter_name: transporter_name.current.value,
                            transporter_email: transporter_email.current.value,
                            company_name: company_name.current.value,
                            mode_of_transportation: mode_of_transportation.current.value,
                            license_number: license_number.current.value,
                            license_year: license_year.current.value,
                            transporter_password: transporter_password.current.value,
                            confirm_transporter_password: confirm_transporter_password.current.value
                        }})
                    .then(response => {
                        transporter_context.setName(transporter_name.current.value);
                        navigate("/transporter")
                    })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="transporter_register" value = "Register"/>
            </div>
        </div>
    </div>
}