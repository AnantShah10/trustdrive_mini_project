import { useState, createContext, useEffect } from "react";

export const ManufacturerContext = createContext(null);

export const ManufacturerProvider = (props) => {
    const [name, setName] = useState(null)

    function _setName(name) {
        localStorage.setItem("manufacturer_name", name)
        setName(name)
    }

    useEffect(() => {
        const manufacturer_name = localStorage.getItem("manufacturer_name") || null
        setName(manufacturer_name)
    }, [])

    const value = {
        name,
        setName: _setName
    }

    return (
        <ManufacturerContext.Provider value = {value}>
            {props.children}
        </ManufacturerContext.Provider>
    )
}