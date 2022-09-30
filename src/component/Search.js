import { useState, useRef, useEffect, useContext } from "react";
import fetchData from "../api/fetch";
import { stockContext } from "../context/StockContextProvider";

const Search = () => {
    const { addSymbol } = useContext(stockContext);
    const [searchText, setSearchText] = useState("");
    const [searchList, setSearchList] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        let amount = true;
        const fetch = async () => {
            const dataList = await fetchData(
                `https://finnhub.io/api/v1/search?q=${searchText}&`
            );
            if (amount) {
                setSearchList(dataList.data.result);
            }
        };
        if (searchText) {
            fetch();
        }
        return () => {
            amount = false;
        };
    }, [searchText]);

    return (
        <form
            className="form-floating w-50 mx-auto mt-5"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input
                type="text"
                className="form-control "
                id="search"
                placeholder="Search"
                ref={inputRef}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                autoComplete="off"
            />
            <label htmlFor="search">Search</label>
            <ul
                className={`dropdown-menu  ${searchText ? "show" : ""}`}
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    cursor: "pointer",
                }}
            >
                {searchList.map((result) => (
                    <li
                        className="dropdown-item"
                        key={result.symbol}
                        onClick={() => {
                            addSymbol(result.symbol);
                            setSearchText("");
                            setSearchList([]);
                        }}
                    >
                        {result.symbol}
                    </li>
                ))}
            </ul>
        </form>
    );
};

export default Search;
