import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from 'react';

import { ManufacturerContext } from "../../context/manufacturer_context";

export default function Manufacturer(props) {
    const { state } = useLocation();
    const manufacturer_context = useContext(ManufacturerContext);
    const [prods, setprods] = useState([]);
    const {contract} = props.info_state;

    useEffect(()=>{
        const products= async ()=> {
            const prods = await contract.getProductDetails();
            setprods(prods);
        };
        contract && products();
    }, [contract]);

    return <div>
        <NavBar />
        <div className = "headingbutton">
            <div> Products Added </div>
            <button><Link to="/manufacturer/add_product_selection"> Add Products </Link></button>
        </div> 
        <div className="products">
            {prods.map((manufacturer_products)=> {
                if ( manufacturer_context.name === manufacturer_products.manufacturername ) {
                    return(
                        <div key={manufacturer_products.productid} style={{width: 100+ "%"}}>
                            <td style = {{width: 25+ "%"}}>{manufacturer_products.productname}</td>
                            <td style = {{width: 50+ "%"}}>Product ID: {manufacturer_products.productid}</td>
                            <td style = {{width: 25+ "%"}}>{manufacturer_products.manufacturingdate}</td>
                        </div>
                    )
                }
            })}
        </div>       
    </div>
}