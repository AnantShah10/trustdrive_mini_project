import "./index.scss";

import { NavLink } from "react-router-dom";

export default function AdminNavigation() {
    return <div className="navigation">
        <NavLink to="/admin_manufacturer" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Manufacturer</NavLink>
        <NavLink to="/admin_transporter" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Transporter</NavLink>
        <NavLink to="/admin_distributor" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Distributor</NavLink>
        <NavLink to="/admin_vendor" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Vendor</NavLink>
        <NavLink to="/admin_user" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>User</NavLink>
        {/* <NavLink to="/admin_product" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Product</NavLink> */}
    </div>
}