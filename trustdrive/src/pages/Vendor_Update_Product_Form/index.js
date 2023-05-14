import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef, useContext } from "react";

import axios from "axios";

import { VendorContext } from "../../context/vendor_context";

export default function Vendoror_Update_Product_Form(props) {
    const { state } = useLocation();
    let navigate = useNavigate();
    let vendor_context = useContext(VendorContext);
    let vendor_name = useRef();
    let vendor_location = useRef();
    let product_id = useRef();

    const addVendor = async ()=>{
        const p_name = state.product_name;
        const {contract} = props.info_state;
        const v_name = vendor_context.name;
        const v_location = vendor_location.current.value;
        const p_id = state.product_id;
        const transaction = await contract.addVendor(v_name, v_location, p_id, p_name)
        await transaction.wait();
        console.log("Transaction is complete");
        navigate("/vendor");
    }
    
    return <div>
        <NavBar />
        <div className="product_form" >
            <div className="heading">
                Vendor Product
            </div>
            <div className="form_div"> 
                <p> {state.product_name} </p> 
            </div>
            <div className="form_div">
                <input type="text" ref={ vendor_name } placeholder="Vendor Name" value = {vendor_context.name} readOnly/>
                <input type="text" ref={ product_id } id="product_id" placeholder="Product ID" value = {state.product_id} readOnly/>
            </div>

            <div className="form_div">
                <textarea type="text" ref={ vendor_location } id="address" placeholder="Address"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/vendor"> Back </Link></button>
                <button onClick={addVendor}> Submit </button>
            </div>
        </div>
    </div>
}