import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useRef } from "react";

import axios from "axios";

import { VendorContext } from "../../context/vendor_context";

export default function Vendor_Register() {
    let navigate = useNavigate();
    let vendor_context = useContext(VendorContext);
    let vendor_name = useRef();
    let vendor_email = useRef();
    let company_name = useRef();
    let vendor_site = useRef();
    let company_register_no = useRef();
    let gst_number = useRef();
    let vendor_password = useRef();
    let confirm_vendor_password = useRef();

    return <div>
        <NavBar />
        <div className="register_box">
            <div className="register">
                REGISTER
            </div>
            <div className="form_div">
                <input type="text" ref={ vendor_name } placeholder="Vendor Name"/>
                <input type="text" ref={ vendor_email } placeholder="Vendor Email"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ company_name } placeholder="Company Name"/>
                <input type="text" ref={ vendor_site } placeholder="Vendor Site"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ company_register_no } placeholder="Company Register No."/>
                <input type="numeric" ref={ gst_number } placeholder="GST Number"/>
            </div>
            <div className="form_div">
                <input type="password" ref={ vendor_password } placeholder="Password"/>
                <input type="password" ref={ confirm_vendor_password } placeholder="Confirm Password"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/"> Back </Link></button>
                <input type = "submit" onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/vendor/register',
                        data: {
                            vendor_name: vendor_name.current.value,
                            vendor_email: vendor_email.current.value,
                            company_name: company_name.current.value,
                            vendor_site: vendor_site.current.value,
                            company_register_no: company_register_no.current.value,
                            gst_number: gst_number.current.value,
                            vendor_password: vendor_password.current.value,
                            confirm_vendor_password: confirm_vendor_password.current.value
                        }})
                    .then(response => {
                        vendor_context.setName(vendor_name.current.value);
                        navigate("/vendor")
                    })
                    .catch((error) => {
                        alert("Error: " + error.response.data.message);
                    })
                }} name="vendor_register" value = "Register"/>
            </div>
        </div>
    </div>
}