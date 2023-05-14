import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from 'react';

import { DistributorContext } from "../../context/distributor_context";

export default function Distributor_Login(props) {
    const { state } = useLocation();
    const navigate = useNavigate();
    const distributor_context = useContext(DistributorContext);
    const [t_prods, sett_prods] = useState([]);
    const [d_prods, setd_prods] = useState([]);
    const {contract} = props.info_state;

    useEffect(()=>{
        const products= async ()=> {
            const t_prods = await contract.getTransportDetails();
            sett_prods(t_prods);
            const d_prods = await contract.getDistributeDetails();
            setd_prods(d_prods);
        };
        contract && products();
    }, [contract]);

    return <div>
        <NavBar />
        <div className = "headingbutton">
            <div> Products to be Distributed </div>
        </div> 
        <div className="already_products">
            {t_prods.map((transporter_products)=> {
                let $flag = 0;
                if ( distributor_context.name === transporter_products.todistributorname) {
                    for (let index = 0; index < d_prods.length; index++) {
                        if (transporter_products.productid === d_prods[index][2]) {
                            $flag += 1;
                        }
                    }
                    if ($flag === 0) {
                        return(
                            <button key={transporter_products.productid} style={{width: 100+ "%"}} onClick= {() => {
                                navigate('/distributor/update_product_form',
                                {
                                    state: {
                                        product_name: transporter_products.productname,
                                        product_id: transporter_products.productid,
                                    }
                                });
                            }
                            }> 
                                <td style = {{width: 25+ "%"}}>{transporter_products.productname}</td>
                                <td style = {{width: 50+ "%"}}>Product ID: {transporter_products.productid}</td>
                            </button>
                        )
                    }
                }
            })}
        </div>
        <div className = "headingbutton">
            <div> Products Distributed </div>
        </div> 
        <div className="products">
            {d_prods.map((distributor_products)=> {
                if ( distributor_context.name === distributor_products.distributorname ) {
                    return(
                        <div key={distributor_products.productid} style={{width: 100+ "%"}}>
                            <td style = {{width: 25+ "%"}}>{distributor_products.productname}</td>
                            <td style = {{width: 50+ "%"}}>Product ID: {distributor_products.productid}</td>
                            <td style = {{width: 25+ "%"}}>{distributor_products.distributingdate}</td>
                        </div>
                    )
                }
            })}
        </div>
    </div>
}