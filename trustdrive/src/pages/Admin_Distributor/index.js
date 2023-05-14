import "./index.scss";

import { NavBar, AdminNavigation } from "../../components";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Admin_Distributor() {
    const [distributors, setDistributors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin_distributor').then(reponse => {
            setDistributors(reponse.data);
        })
        .catch((error) => {
            alert("Error: ", error);
        })}, []);

    return <div>
        <NavBar />
        <AdminNavigation />
        <table style={{width: 100 + "%"}}>
            <thead>
                <th style={{width: 20 + "%"}}>Distributor Name</th>
                <th style={{width: 20 + "%"}}>Distributor Email</th>
                <th style={{width: 20 + "%"}}>Company Name</th>
                <th style={{width: 20 + "%"}}>GST Number</th>
                <th style={{width: 20 + "%"}}>Distributor Password</th>
            </thead>
            <tbody>
            {distributors.map(distributor => (
                <tr>
                    <td>{distributor.distributor_name}</td> 
                    <td>{distributor.distributor_email}</td>
                    <td>{distributor.company_name}</td>
                    <td>{distributor.gst_number}</td>
                    <td>{distributor.distributor_password}</td>
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