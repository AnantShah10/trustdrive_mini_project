import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { DistributorContext } from "../../context/distributor_context";

export default function Distributor_Register() {
    let navigate = useNavigate();
    let distributor_context = useContext(DistributorContext);
    let distributor_name = useRef();
    let distributor_email = useRef();
    let company_name = useRef();
    let gst_number = useRef();
    let distributor_password = useRef();
    let confirm_distributor_password = useRef();

    return <div className="distributor_component">
        <NavBar />
        <div className="register_box">
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ distributor_name } placeholder="Distributor Name"/>
                <input type="text" ref={ distributor_email } placeholder="Distributor Email"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ company_name } placeholder="Company Name"/>
                <input type="text" ref={ gst_number } placeholder="GST Number"/>
            </div>
            {/* <div className="form_div"> */}
                {/* <input type="text" name="company_origin" placeholder="Company Origin"/> */}
                {/* <input type="numeric" name="license_year" placeholder="Year of License"/> */}
            {/* </div> */}
            <div className="form_div">
                <input type="password" ref={ distributor_password } placeholder="Password"/>
                <input type="password" ref={ confirm_distributor_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/distributor/register',
                        data: {
                            distributor_name: distributor_name.current.value,
                            distributor_email: distributor_email.current.value,
                            company_name: company_name.current.value,
                            gst_number: gst_number.current.value,
                            distributor_password: distributor_password.current.value,
                            confirm_distributor_password: confirm_distributor_password.current.value
                        }})
                    .then(response => {
                        distributor_context.setName(distributor_name.current.value);
                        navigate("/distributor")
                    })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="distributor_register" value = "Register"/>
            </div>
        </div>
    </div>
}