import { useState, createContext, useEffect } from "react";

export const DistributorContext = createContext(null);

export const DistributorProvider = (props) => {
    const [name, setName] = useState(null)

    function _setName(name) {
        localStorage.setItem("distributor_name", name)
        setName(name)
    }

    useEffect(() => {
        const distributor_name = localStorage.getItem("distributor_name") || null
        setName(distributor_name)
    }, [])

    const value = {
        name,
        setName: _setName
    }

    return (
        <DistributorContext.Provider value = {value}>
            {props.children}
        </DistributorContext.Provider>
    )
}