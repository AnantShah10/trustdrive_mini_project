import "./index.scss";

import { NavBar, AdminNavigation } from "../../components";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Admin_Vendor() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin_vendor').then(reponse => {
            setVendors(reponse.data);
        })
        .catch((error) => {
            alert("Error: ", error);
        })}, []);

    return <div>
        <NavBar />
        <AdminNavigation />
        <table style={{width: 100 + "%"}}>
            <thead>
                <th style={{width: 14 + "%"}}>Vendor Name</th>
                <th style={{width: 13 + "%"}}>Vendor Email</th>
                <th style={{width: 14 + "%"}}>Company Name</th>
                <th style={{width: 14 + "%"}}>Vendor Site</th>
                <th style={{width: 15 + "%"}}>Company Register Number</th>
                <th style={{width: 15 + "%"}}>GST Number</th>
                <th style={{width: 15 + "%"}}>Vendor Password</th>
                {/* <th style={{width: 10 + "%"}}>Button</th> */}
            </thead>
            <tbody>
            {vendors.map(vendor => (
                <tr>
                    <td>{vendor.vendor_name}</td> 
                    <td>{vendor.vendor_email}</td>
                    <td>{vendor.company_name}</td>
                    <td>{vendor.vendor_site}</td>
                    <td>{vendor.company_register_no}</td>
                    <td>{vendor.gst_number}</td>
                    <td>{vendor.vendor_password}</td>
                    {/* <td> */}
                        {/* <input type = "submit" onClick={() => {
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
                        }} name="admin_login" value = "Login"/> */}
                    {/* </td> */}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
}