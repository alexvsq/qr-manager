import { createContext, useContext, useState, useEffect } from 'react';
import { getAllDataSqlHistory } from '@/functions/sql/history-qr';
import { getAllDataSqlCreates } from '@/functions/sql/create-qr';
import { getDataSettings, saveVibrate, saveSound } from '@/functions/sql/settings'

const Context = createContext();

function ContextProvider({ children }) {

    const [torch, setTorch] = useState(false);
    const [facingCamera, setFacingCamera] = useState('back');
    const [screen, setScreen] = useState('scanner');
    const [listHistory, setListHistory] = useState([]);
    const [listCreates, setListCreates] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [filterHistory, setFilterHistory] = useState('');
    const [elimanteOption, setEliminateOption] = useState(false);
    const [settings, setSettings] = useState({
        id: 1,
        languages: 'en',
        sound: false,
        vibrate: true,
    })

    const valuesContext = { torch, setTorch, screen, setScreen, listCreates, setListCreates, listHistory, setListHistory, showCards, setShowCards, facingCamera, setFacingCamera, filterHistory, setFilterHistory, elimanteOption, setEliminateOption, settings, setSettings };

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
    async function getAndSetDataSettings() {
        try {
            const res = await getDataSettings()
            if (res) {
                setSettings({
                    ...settings,
                    languages: res.languages,
                    sound: Boolean(res.sound),
                    vibrate: Boolean(res.vibrate),
                })
            }
        } catch (error) {
            console.error("getAndSetDataSettings", error);
        }
    }

    useEffect(() => {
        getDataList();
        getAndSetDataSettings();
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