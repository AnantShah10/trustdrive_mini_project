import "./index.scss";

import { NavBar, AdminNavigation } from "../../components";

import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Admin_User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin_user').then(reponse => {
            setUsers(reponse.data);
        })
        .catch((error) => {
            alert("Error: ", error);
        })}, []);

    return <div>
        <NavBar />
        <AdminNavigation />
        <table style={{width: 100 + "%"}}>
            <thead>
                <th style={{width: 20 + "%"}}>User Name</th>
                <th style={{width: 20 + "%"}}>User Email</th>
                <th style={{width: 20 + "%"}}>Aadhar Number</th>
                <th style={{width: 20 + "%"}}>User Phone Number</th>
                <th style={{width: 20 + "%"}}>User Password</th>
                {/* <th style={{width: 16 + "%"}}>Button</th> */}
            </thead>
            <tbody>
            {users.map(user => (
                <tr>
                    <td>{user.user_name}</td> 
                    <td>{user.user_email}</td>
                    <td>{user.aadhar_number}</td>
                    <td>{user.user_phone_number}</td>
                    <td>{user.user_password}</td>
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