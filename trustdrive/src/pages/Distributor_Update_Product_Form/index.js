import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef, useContext } from "react";

import axios from "axios";

import { DistributorContext } from "../../context/distributor_context";

export default function Distributor_Update_Product_Form(props) {
    const { state } = useLocation();
    let navigate = useNavigate();
    let distributor_context = useContext(DistributorContext);
    let distributor_name = useRef();
    let distributing_date = useRef();
    let product_id = useRef();
    let vendor_name = useRef();
    let addressvendor = useRef();

    const addDistribute = async ()=>{
        const p_name = state.product_name;
        const {contract} = props.info_state;
        const d_name = distributor_context.name;
        const d_date = distributing_date.current.value;
        const p_id = state.product_id;
        const v_name = vendor_name.current.value;
        const v_address = addressvendor.current.value;
        const transaction = await contract.addDistribute(d_name, d_date, p_id, p_name, v_address, v_name)
        await transaction.wait();
        console.log("Transaction is complete");
        navigate("/distributor");
    }

    return <div>
        <NavBar />
        <div className="product_form" >
            <div className="heading">
                Distribute Product
            </div>
            <div className="form_div"> 
                <p> {state.product_name} </p> 
            </div>
            <div className="form_div">
                <input type="text" ref={ distributor_name } placeholder="Distribuor Name" value = {distributor_context.name} readOnly/>
                <input type="text" ref={ distributing_date } placeholder="Distributing Date"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ product_id } id="product_id" placeholder="Product ID" value = {state.product_id} readOnly/>
                <input type="text" ref={ vendor_name } placeholder="Vendor Name"/>
            </div>
            <div className="form_div">
                <textarea type="text" ref={ addressvendor } id="address" placeholder="Vendor Address"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/distributor"> Back </Link></button>
                <button onClick={addDistribute}> Submit </button>
            </div>
        </div>
    </div>
}