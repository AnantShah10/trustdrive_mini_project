import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef, useContext } from "react";

import { useState, useEffect } from 'react';

import axios from "axios";

export default function User(props) {
    let navigate = useNavigate();
    let product_id = useRef();
    const {contract} = props.info_state;
    const [genuinty, setgenuinty] = useState(null);
    const [m_prods, setm_prods] = useState([]);
    const [t_prods, sett_prods] = useState([]);
    const [d_prods, setd_prods] = useState([]);
    const [v_prods, setv_prods] = useState([]);
    const [history, sethistory] = useState(false);

    const checkgenuine = async ()=>{
        const {contract} = props.info_state;
        const p_id = product_id.current.value;
        const genuinty = await contract.callStatic.checkgenuine(p_id);
        setgenuinty(genuinty);
    }

    const show_history = async ()=> {
        if (history == false) {
            const m_prods = await contract.getProductDetails();
            setm_prods(m_prods);
            const t_prods = await contract.getTransportDetails();
            sett_prods(t_prods);
            const d_prods = await contract.getDistributeDetails();
            setd_prods(d_prods);
            const v_prods = await contract.getVendorDetails();
            setv_prods(v_prods);
        }
        sethistory(!history);
    }

    return <div>
        <NavBar />
        <div className="product_form" >
            <div className="heading">
                Check Product
            </div>
            <div className="user_div"> 
                <input type="text" ref={ product_id } id="product_id" placeholder="Enter Product ID" /> 
            </div>
            <div className="user_div user_button">
                <button onClick={checkgenuine}> Submit </button>
            </div>
            {genuinty != null && (
                <>
                    <div className = "genuity">This product is {genuinty ? <span className='green'> genuine</span> : <span className='red'> not genuine</span>}</div>
                    <div  className="user_div user_button">
                        <button onClick={show_history}>Show History</button>
                        {history != false && (
                            <>
                                {m_prods.map((manufacturer_products)=> {
                                    if (manufacturer_products.productid == product_id.current.value) {
                                        return (
                                            <div className="report">
                                                <div>Product Name: {manufacturer_products.productname}</div>
                                                <div>Manufacturer Name: {manufacturer_products.manufacturername}</div>
                                                <div>Manufacturing Date: {manufacturer_products.manufacturingdate}</div>
                                            </div>
                                        )
                                    }
                                })}
                                {t_prods.map((transporter_products)=> {
                                    if (transporter_products.productid == product_id.current.value) {
                                        return (
                                            <div className="report">
                                                <div>Transporter Name: {transporter_products.transportername}</div>
                                                <div>Transporting Date: {transporter_products.transportingdate}</div>
                                                <div>Transporting Address: {transporter_products.transportingaddress}</div>
                                            </div>
                                        )
                                    }
                                })}
                                {d_prods.map((distributor_products)=> {
                                    if (distributor_products.productid == product_id.current.value) {
                                        return (
                                            <div className="report">
                                                <div>Distributor Name: {distributor_products.distributorname}</div>
                                                <div>Distributing Date: {distributor_products.distributingdate}</div>
                                                <div>Distributing Address: {distributor_products.addressofvendor}</div>
                                            </div>
                                        )
                                    }
                                })}
                                {v_prods.map((vendor_products)=> {
                                    if (vendor_products.productid == product_id.current.value) {
                                        return (
                                            <div className="report">
                                                <div>Vendor Name: {vendor_products.vendorname}</div>
                                                <div>Vendor Location: {vendor_products.vendorlocation}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    </div>
}