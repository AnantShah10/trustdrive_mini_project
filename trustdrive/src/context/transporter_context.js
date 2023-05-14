import { useState, createContext, useEffect } from "react";

export const TransporterContext = createContext(null);

export const TransporterProvider = (props) => {
    const [name, setName] = useState(null)

    function _setName(name) {
        localStorage.setItem("transporter_name", name)
        setName(name)
    }

    useEffect(() => {
        const transporter_name = localStorage.getItem("transporter_name") || null
        setName(transporter_name)
    }, [])

    const value = {
        name,
        setName: _setName
    }

    return (
        <TransporterContext.Provider value = {value}>
            {props.children}
        </TransporterContext.Provider>
    )
}