import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAllDataSqlHistory } from "@/functions/sql/history-qr";
import { getAllDataSqlCreates } from "@/functions/sql/create-qr";
import { getDataSettings } from "@/functions/sql/settings";
import { screenType } from '@/types/types'
import { screens } from '@/utils/icons'

interface Settings {
    id: number;
    languages: string;
    sound: boolean;
    vibrate: boolean;
}

interface ContextValues {
    torch: boolean;
    setTorch: React.Dispatch<React.SetStateAction<boolean>>;
    facingCamera: string;
    setFacingCamera: React.Dispatch<React.SetStateAction<string>>;
    screen: screenType;
    setScreen: React.Dispatch<React.SetStateAction<screenType>>;
    listHistory: any[]; // Puedes especificar el tipo exacto si conoces la estructura
    setListHistory: React.Dispatch<React.SetStateAction<any[]>>;
    listCreates: any[]; // Igual que arriba
    setListCreates: React.Dispatch<React.SetStateAction<any[]>>;
    showCards: boolean;
    setShowCards: React.Dispatch<React.SetStateAction<boolean>>;
    filterHistory: string;
    setFilterHistory: React.Dispatch<React.SetStateAction<string>>;
    elimanteOption: boolean;
    setEliminateOption: React.Dispatch<React.SetStateAction<boolean>>;
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const Context = createContext<ContextValues | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [torch, setTorch] = useState(false);
    const [facingCamera, setFacingCamera] = useState("back");
    const [screen, setScreen] = useState<screenType>(screens[0]);
    const [listHistory, setListHistory] = useState<any[]>([]);
    const [listCreates, setListCreates] = useState<any[]>([]);
    const [showCards, setShowCards] = useState(false);
    const [filterHistory, setFilterHistory] = useState("");
    const [elimanteOption, setEliminateOption] = useState(false);
    const [settings, setSettings] = useState<Settings>({
        id: 1,
        languages: "en",
        sound: false,
        vibrate: true,
    });

    const valuesContext: ContextValues = {
        torch,
        setTorch,
        screen,
        setScreen,
        listCreates,
        setListCreates,
        listHistory,
        setListHistory,
        showCards,
        setShowCards,
        facingCamera,
        setFacingCamera,
        filterHistory,
        setFilterHistory,
        elimanteOption,
        setEliminateOption,
        settings,
        setSettings,
    };

    async function getDataList() {
        try {
            const resultHistory = await getAllDataSqlHistory();
            const resultCreates = await getAllDataSqlCreates();

            if (resultHistory) setListHistory(resultHistory);
            if (resultCreates) setListCreates(resultCreates);
        } catch (error) {
            console.error("getDataSql2", error);
        }
    }

    async function getAndSetDataSettings() {
        try {
            const res = await getDataSettings();
            if (res) {
                setSettings({
                    ...settings,
                    languages: res.languages,
                    sound: Boolean(res.sound),
                    vibrate: Boolean(res.vibrate),
                });
            }
        } catch (error) {
            console.error("getAndSetDataSettings", error);
        }
    }

    useEffect(() => {
        getDataList();
        getAndSetDataSettings();
    }, []);

    return <Context.Provider value={valuesContext}>{children}</Context.Provider>;
};

export const useContextData = (): ContextValues => {
    const contextData = useContext(Context);
    if (!contextData) {
        throw new Error("useContextData debe usarse dentro de un ContextProvider");
    }
    return contextData;
};
