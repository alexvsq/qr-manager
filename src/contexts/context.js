import { createContext, useContext, useState, useEffect } from 'react';
import { getAllDataSqlHistory } from '@/functions/sql/history-qr';
import { getAllDataSqlCreates } from '@/functions/sql/create-qr';

const Context = createContext();

function ContextProvider({ children }) {

    const [torch, setTorch] = useState(false);
    const [facingCamera, setFacingCamera] = useState('back');
    const [screen, setScreen] = useState('scanner');
    const [listHistory, setListHistory] = useState([]);
    const [listCreates, setListCreates] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [filterHistory, setFilterHistory] = useState('');

    const valuesContext = { torch, setTorch, screen, setScreen, listCreates, setListCreates, listHistory, setListHistory, showCards, setShowCards, facingCamera, setFacingCamera, filterHistory, setFilterHistory };

    async function getDataList() {
        try {
            const resultHistory = await getAllDataSqlHistory();
            const resultCreates = await getAllDataSqlCreates()

            if (resultHistory) setListHistory(resultHistory)
            if (resultCreates) setListCreates(resultCreates)

        } catch (error) {
            console.log("getDataSql2", error);
        }
    }

    useEffect(() => {
        getDataList();
    }, []);

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