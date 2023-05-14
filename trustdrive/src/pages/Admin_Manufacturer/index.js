import "./index.scss";

import { NavBar, AdminNavigation } from "../../components";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Admin_Manufacturer() {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin_manufacturer').then(reponse => {
            setManufacturers(reponse.data);
        })
        .catch((error) => {
            alert("Error: ", error);
        })}, []);

    return <div>
        <NavBar />
        <AdminNavigation />
        <table style={{width: 100 + "%"}}>
            <thead>
                <th style={{width: 14 + "%"}}>Manufacturer Name</th>
                <th style={{width: 14 + "%"}}>Manufacturer Email</th>
                <th style={{width: 14 + "%"}}>Company Name</th>
                <th style={{width: 14 + "%"}}>Company Origin</th>
                <th style={{width: 15 + "%"}}>License Number</th>
                <th style={{width: 14 + "%"}}>License Year</th>
                <th style={{width: 15 + "%"}}>Manufacturer Password</th>
            </thead>
            <tbody>
            {manufacturers.map(manufacturer => (
                <tr>
                    <td>{manufacturer.manufacturer_name}</td> 
                    <td>{manufacturer.manufacturer_email}</td>
                    <td>{manufacturer.company_name}</td>
                    <td>{manufacturer.company_origin}</td>
                    <td>{manufacturer.license_number}</td>
                    <td>{manufacturer.license_year}</td>
                    <td>{manufacturer.manufacturer_password}</td>
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