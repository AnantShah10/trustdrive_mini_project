import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from 'react';

import { VendorContext } from "../../context/vendor_context";

export default function Vendor(props) {
    const { state } = useLocation();
    const navigate = useNavigate();
    const vendor_context = useContext(VendorContext);
    const [d_prods, setd_prods] = useState([]);
    const [v_prods, setv_prods] = useState([]);
    const {contract} = props.info_state;

    useEffect(()=>{
        const products= async ()=> {
            const d_prods = await contract.getDistributeDetails();
            setd_prods(d_prods);
            const v_prods = await contract.getVendorDetails();
            setv_prods(v_prods);
        };
        contract && products();
    }, [contract]);

    return <div>
        <NavBar />
        <div className = "headingbutton">
            <div> Products to be Vendored </div>
        </div> 
        <div className="already_products">
            {d_prods.map((distributor_products)=> {
                let $flag = 0;
                if ( vendor_context.name === distributor_products.tovendorname) {
                    for (let index = 0; index < v_prods.length; index++) {
                        if (distributor_products.productid === v_prods[index][2]) {
                            $flag += 1;
                        }
                    }
                    if ($flag === 0) {
                        return(
                            <button key={distributor_products.productid} style={{width: 100+ "%"}} onClick= {() => {
                                navigate('/vendor/update_product_form',
                                {
                                    state: {
                                        product_name: distributor_products.productname,
                                        product_id: distributor_products.productid,
                                    }
                                });
                            }
                            }> 
                                <td style = {{width: 25+ "%"}}>{distributor_products.productname}</td>
                                <td style = {{width: 50+ "%"}}>Product ID: {distributor_products.productid}</td>
                            </button>
                        )
                    }
                }
            })}
        </div>
        <div className = "headingbutton">
            <div> Products Vendored </div>
        </div> 
        <div className="products">
            {v_prods.map((vendor_products)=> {
                if ( vendor_context.name === vendor_products.vendorname ) {
                    return(
                        <div key={vendor_products.productid} style={{width: 100+ "%"}}>
                            <td style = {{width: 25+ "%"}}>{vendor_products.productname}</td>
                            <td style = {{width: 50+ "%"}}>Product ID: {vendor_products.productid}</td>
                            <td style = {{width: 25+ "%"}}>{vendor_products.vendorlocation}</td>
                        </div>
                    )
                }
            })}
        </div>
    </div>
}