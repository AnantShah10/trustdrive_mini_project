import { useState, createContext, useEffect } from "react";

export const VendorContext = createContext(null);

export const VendorProvider = (props) => {
    const [name, setName] = useState(null)

    function _setName(name) {
        localStorage.setItem("vendor_name", name)
        setName(name)
    }

    useEffect(() => {
        const vendor_name = localStorage.getItem("vendor_name") || null
        setName(vendor_name)
    }, [])

    const value = {
        name,
        setName: _setName
    }

    return (
        <VendorContext.Provider value = {value}>
            {props.children}
        </VendorContext.Provider>
    )
}