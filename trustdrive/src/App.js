import './styles/App.scss';

import abi from './contracts/ProductDetails.json';

import { useState, useEffect } from 'react';

import { ethers } from "ethers";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as Pages from "./pages/index.js";

import Providers from "./context"

function App() {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract: null
  });

  useEffect(() => {
    const connect_wallet=async()=>{
      const contract_address = "0xd3bD590211dA5b6a251B7278E3e00c2084924765";
      const contract_abi = abi.abi;
      
      try {
        const { ethereum } = window;
        
        if(ethereum) {
          const account = await ethereum.request({method: "eth_requestAccounts",})
        }
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contract_address, contract_abi, signer);
        
        setState({provider, signer, contract});
      }
      catch(error) {
        console.log(error);
      }
    };
    connect_wallet();
  }, []);

  return (
    <div id="App">
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pages.Home />}></Route>
            <Route path="/manufacturer" element={<Pages.Manufacturer info_state ={state}/>}></Route>
            <Route path="/manufacturer/login" element={<Pages.Manufacturer_Login />}></Route>
            <Route path="/manufacturer/register" element={<Pages.Manufacturer_Register />}></Route>
            <Route path="/transporter" element={<Pages.Transporter info_state ={state}/>}></Route>
            <Route path="/transporter/login" element={<Pages.Transporter_Login />}></Route>
            <Route path="/transporter/register" element={<Pages.Transporter_Register />}></Route>
            <Route path="/distributor" element={<Pages.Distributor info_state ={state}/>}></Route>
            <Route path="/distributor/login" element={<Pages.Distributor_Login />}></Route>
            <Route path="/distributor/register" element={<Pages.Distributor_Register />}></Route>
            <Route path="/vendor" element={<Pages.Vendor info_state ={state}/>}></Route>
            <Route path="/vendor/login" element={<Pages.Vendor_Login />}></Route>
            <Route path="/vendor/register" element={<Pages.Vendor_Register />}></Route>
            <Route path="/user" element={<Pages.User info_state ={state}/>}></Route>
            <Route path="/user/login" element={<Pages.User_Login />}></Route>
            <Route path="/user/register" element={<Pages.User_Register />}></Route>
            <Route path="/admin/login" element={<Pages.Admin_Login />}></Route>
            <Route path="/admin/register" element={<Pages.Admin_Register />}></Route>
            <Route path="/manufacturer/add_product_selection" element={<Pages.Manufacturer_Add_Product_Selection />}></Route>
            <Route path="/manufacturer/add_product_form" element={<Pages.Manufacturer_Add_Product_Form info_state ={state}/>}></Route>
            <Route path="/transporter/update_product_form" element={<Pages.Transporter_Update_Product_Form info_state ={state}/>}></Route>
            <Route path="/distributor/update_product_form" element={<Pages.Distributor_Update_Product_Form info_state ={state}/>}></Route>
            <Route path="/vendor/update_product_form" element={<Pages.Vendor_Update_Product_Form info_state ={state}/>}></Route>
            <Route path="/admin_manufacturer" element={<Pages.Admin_Manufacturer />}></Route>
            <Route path="/admin_transporter" element={<Pages.Admin_Transporter />}></Route>
            <Route path="/admin_distributor" element={<Pages.Admin_Distributor />}></Route>
            <Route path="/admin_vendor" element={<Pages.Admin_Vendor />}></Route>
            <Route path="/admin_user" element={<Pages.Admin_User />}></Route>
            <Route path="/admin_product" element={<Pages.Admin_Product />}></Route>
          </Routes>
        </BrowserRouter>
      </Providers>
    </div>
  );
}

export default App;
