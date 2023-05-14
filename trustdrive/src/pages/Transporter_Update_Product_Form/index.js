import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef, useContext } from "react";

import axios from "axios";

import { TransporterContext } from "../../context/transporter_context";

export default function Transporter_Update_Product_Form(props) {
    const { state } = useLocation();
    let navigate = useNavigate();
    let transporter_context = useContext(TransporterContext);
    let transporter_name = useRef();
    let transporting_date = useRef();
    let product_id = useRef();
    let distributor_name = useRef();
    let address = useRef();

    const addTransport = async ()=>{
        const p_name = state.product_name;
        const {contract} = props.info_state;
        const t_name = transporter_context.name;
        const t_date = transporting_date.current.value;
        const p_id = state.product_id;
        const d_name = distributor_name.current.value;
        const t_address = address.current.value;
        const transaction = await contract.addTranport(t_name, t_date, p_id, p_name, t_address, d_name);
        console.log(t_address)
        await transaction.wait();
        console.log("Transaction is complete");
        navigate("/transporter");
    }

    return <div>
        <NavBar />
        <div className="product_form" >
            <div className="heading">
                Transport Product
            </div>
            <div className="form_div"> 
                <p> {state.product_name} </p> 
            </div>
            <div className="form_div">
                <input type="text" ref={ transporter_name } placeholder="Transporter Name" value = {transporter_context.name} readOnly/>
                <input type="text" ref={ transporting_date } placeholder="Transporting Date"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ product_id } id="product_id" placeholder="Product ID" value = {state.product_id} readOnly/>
                <input type="text" ref={ distributor_name } placeholder="Distributor Name"/>
            </div>
            <div className="form_div">
                <textarea type="text" ref={ address } id="address" placeholder="Address"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/transporter"> Back </Link></button>
                <button onClick={addTransport}> Submit</button>
            </div>
        </div>
    </div>
}