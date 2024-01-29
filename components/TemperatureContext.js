// TemperatureContext.js

import React, { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    const toggleTemperatureUnit = () => {
        setIsCelsius((prevValue) => !prevValue);
    };

    return (
        <TemperatureContext.Provider value={{ isCelsius, toggleTemperatureUnit }}>
            {children}
        </TemperatureContext.Provider>
    );
};

export const useTemperatureContext = () => useContext(TemperatureContext);
