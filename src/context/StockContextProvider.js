import React, { useState, useEffect } from "react";

export const stockContext = React.createContext();

const StockContextProvider = (props) => {
    const [symbolList, setSymbolList] = useState(
        localStorage.getItem("stockList")?.split(",") || [
            "GOOG",
            "AAPL",
            "TSLA",
        ]
    );
    useEffect(() => {
        if (symbolList.length === 0) {
            localStorage.removeItem("stockList");
        } else {
            localStorage.setItem("stockList", symbolList);
        }
    }, [symbolList]);

    const [searchSymbol, setSearchSymbol] = useState("");
    const addSymbol = (symbol) => {
        if (symbolList.find((item) => item === symbol)) return;
        setSymbolList([...symbolList, symbol]);
        setSearchSymbol(symbol);
    };

    const removeSymbol = (symbol) => {
        const newList = symbolList.filter((item) => item !== symbol);
        setSymbolList(newList);
    };
    return (
        <stockContext.Provider
            value={{ symbolList, searchSymbol, addSymbol, removeSymbol }}
        >
            {props.children}
        </stockContext.Provider>
    );
};
export default StockContextProvider;
