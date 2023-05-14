import "./index.scss";

import { NavBar, AdminNavigation } from "../../components";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Admin_Transporter() {
    const [transporters, setTransporters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin_transporter').then(reponse => {
            setTransporters(reponse.data);
        })
        .catch((error) => {
            alert("Error: ", error);
        })}, []);

    return <div>
        <NavBar />
        <AdminNavigation />
        <table style={{width: 100 + "%"}}>
            <thead>
                <th style={{width: 14 + "%"}}>Transporter Name</th>
                <th style={{width: 14 + "%"}}>Transporter Email</th>
                <th style={{width: 14 + "%"}}>Company Name</th>
                <th style={{width: 14 + "%"}}>Mode of Tranportation</th>
                <th style={{width: 15 + "%"}}>License Number</th>
                <th style={{width: 14 + "%"}}>License Year</th>
                <th style={{width: 15 + "%"}}>Transporter Password</th>
            </thead>
            <tbody>
            {transporters.map(transporter => (
                <tr>
                    <td>{transporter.transporter_name}</td> 
                    <td>{transporter.transporter_email}</td>
                    <td>{transporter.company_name}</td>
                    <td>{transporter.mode_of_transportation}</td>
                    <td>{transporter.license_number}</td>
                    <td>{transporter.license_year}</td>
                    <td>{transporter.transporter_password}</td>
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