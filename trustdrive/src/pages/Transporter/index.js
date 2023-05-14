import "./index.scss";

import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect, useContext } from 'react';

import { TransporterContext } from "../../context/transporter_context";

export default function Transporter(props) {
    const { state } = useLocation();
    const navigate = useNavigate();
    const transporter_context = useContext(TransporterContext);
    const [m_prods, setm_prods] = useState([]);
    const [t_prods, sett_prods] = useState([]);
    const {contract} = props.info_state;

    useEffect(()=>{
        const products= async ()=> {
            const m_prods = await contract.getProductDetails();
            setm_prods(m_prods);
            const t_prods = await contract.getTransportDetails();
            sett_prods(t_prods);
        };
        contract && products();
    }, [contract]);

    return <div>
        <NavBar />
        <div className = "headingbutton">
            <div> Products to be Added </div>
        </div> 
        <div className="already_products">
            {m_prods.map((manufacturer_products)=> {
                let $flag = 0;
                console.log($flag);
                if ( transporter_context.name == manufacturer_products.totransportername) {
                    for (let index = 0; index < t_prods.length; index++) {
                        if (manufacturer_products.productid == t_prods[index][2]) {
                            $flag += 1;
                        }
                    }
                    if ($flag == 0) {
                        return(
                            <button key={manufacturer_products.productid} style={{width: 100+ "%"}} onClick= {() => {
                                navigate('/transporter/update_product_form',
                                {
                                    state: {
                                        product_name: manufacturer_products.productname,
                                        product_id: manufacturer_products.productid,
                                    }
                                });
                            }
                            }> 
                                <td style = {{width: 25+ "%"}}>{manufacturer_products.productname}</td>
                                <td style = {{width: 50+ "%"}}>Product ID: {manufacturer_products.productid}</td>
                            </button>
                        )
                    }
                }
            })}
        </div>
        <div className = "headingbutton">
            <div> Products Added </div>
        </div> 
        <div className="products">
            {t_prods.map((transporter_products)=> {
                if ( transporter_context.name == transporter_products.transportername ) {
                    return(
                        <div key={transporter_products.productid} style={{width: 100+ "%"}}>
                            <td style = {{width: 25+ "%"}}>{transporter_products.productname}</td>
                            <td style = {{width: 50+ "%"}}>Product ID: {transporter_products.productid}</td>
                            <td style = {{width: 25+ "%"}}>{transporter_products.transportingdate}</td>
                        </div>
                    )
                }
            })}
        </div>
    </div>
}