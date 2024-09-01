import { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

function ContextProvider({ children }) {

    const [torch, setTorch] = useState(false);
    const [screen, setScreen] = useState('scanner');
    const valuesContext = { torch, setTorch, screen, setScreen };

    return (
        <Context.Provider value={valuesContext}>
            {children}
        </Context.Provider>
    )
}

function useContextData() {
    const contextData = useContext(Context);
    return contextData;
}

export { ContextProvider, useContextData };