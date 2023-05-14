import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useRef, useContext } from "react";

import axios from "axios";

import { ManufacturerContext } from "../../context/manufacturer_context";

export default function Manufacturer_Add_Product_Form(props) {
    const { state } = useLocation();
    let navigate = useNavigate();
    let manufacturer_context = useContext(ManufacturerContext);
    let manufacturer_name = useRef();
    let manufacturing_date = useRef();
    let product_id = useRef();
    let transporter_name = useRef();
    let product_detail = useRef();

    const addProduct = async ()=>{
        const p_name = state.product_name;
        const {contract} = props.info_state;
        const m_name = manufacturer_context.name;
        const m_date = manufacturing_date.current.value;
        const p_id = product_id.current.value;
        const t_name = transporter_name.current.value;
        const p_detail = product_detail.current.value;
        const transaction = await contract.addProduct(m_name, m_date, p_id, p_name, p_detail, t_name)
        await transaction.wait();
        console.log("Transaction is complete");
        navigate("/manufacturer");
    }

    return <div>
        <NavBar />
        <div className="product_form">
            <div className="heading">
                Add Product
            </div>
            <div className="form_div"> 
                <p> {state.product_name} </p> 
            </div>
            <div className="form_div">
                <input type="text" ref={ manufacturer_name } placeholder="Manufacturer Name" value = {manufacturer_context.name} readOnly/>
                <input type="text" ref={ manufacturing_date } placeholder="Manufacturing Date"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ product_id } id="product_id" placeholder="Product ID"/>
                <input type="text" ref={ transporter_name } placeholder="Transporter Name"/>
            </div>
            <div className="form_div">
                <textarea type="text" ref={ product_detail } id="product_detail" placeholder="Product Detail"/>
            </div>
            <div className="form_div form_button">
                <button><Link to="/manufacturer/add_product_selection"> Back </Link></button>
                <button onClick={addProduct}>Submit</button>
            </div>
        </div>
    </div>
}