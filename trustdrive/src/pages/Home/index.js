import "./index.scss";

import { HomeCard, NavBar } from "../../components";

import admin from "../../images/admin.svg";
import user from "../../images/user.svg";
import manufacturer from "../../images/manufacturer.svg";
import transporter from "../../images/transporter.svg";
import distributor from "../../images/distributor.svg";
import vendor from "../../images/vendor.svg";

export default function Home(props) {
    return <div className="home">
        <NavBar />
        <div className="hrow">
            <HomeCard name="Admin" img= { admin } alt = "admin_image" registration="/admin/register" login ="/admin/login"/>
            <HomeCard name="User" img= { user } alt = "user_image" registration="/user/register" login ="/user/login"/>
        </div>
        <div className="hrow">
            <HomeCard name="Manufacturer" img= { manufacturer } alt = "manufacturer_image" registration="/manufacturer/register" login ="/manufacturer/login"/>
            <HomeCard name="Transporter" img= { transporter } alt = "transporter_image" registration="/transporter/register" login ="/transporter/login"/>
        </div>
        <div className="hrow">
            <HomeCard name="Distributor" img= { distributor } alt = "distributor_image" registration="/distributor/register" login ="/distributor/login"/>
            <HomeCard name="Vendor" img= { vendor } alt = "vendor_image" registration="/vendor/register" login ="/vendor/login"/>
        </div>
    </div>
}