import "./index.scss";

import { NavBar } from "../../components";

import { Link, useNavigate } from "react-router-dom";

export default function Manufacturer_Add_Product_Selection() {
    const navigate = useNavigate();

    return <div>
        <NavBar />
        <div className="product_box" >
            <div className="heading">
                Add Product
            </div>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Alloy Rims",
                    }
                });
            }
            }> Alloy Rims </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Brake Pads",
                    }
                });
            }
            }> Brake Pads </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Engine Components",
                    }
                });
            }
            }> Engine Components </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Filters",
                    }
                });
            }
            }> Filters </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Grills",
                    }
                });
            }
            }> Grills </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Master Cylinders",
                    }
                });
            }
            }> Master Cylinders </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Radiators",
                    }
                });
            }
            }> Radiators </button>
            <button onClick= {() => {
                navigate('/manufacturer/add_product_form',
                {
                    state: {
                        product_name: "Tail Lights",
                    }
                });
            }
            }> Tail Lights </button>
            <button><Link to="/manufacturer"> Back </Link></button>
        </div>
    </div>
}