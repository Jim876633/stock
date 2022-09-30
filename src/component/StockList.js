import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import fetchData from "../api/fetch";
import { stockContext } from "../context/StockContextProvider";
import { FaCaretUp, FaCaretDown, FaTrashAlt } from "react-icons/fa";

const StockList = () => {
    const { symbolList, searchSymbol, removeSymbol } = useContext(stockContext);
    const [stocks, setStocks] = useState([]);
    const [validStock, setVaildStock] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        let mounted = true;
        const fetch = async () => {
            let timeID;
            try {
                const dataList = await Promise.all(
                    symbolList.map((item) =>
                        fetchData(
                            `https://finnhub.io/api/v1/quote?symbol=${item}&`,
                            item
                        )
                    )
                );
                if (mounted) {
                    setStocks(dataList);
                }
            } catch (err) {
                console.log(err);
                setVaildStock(false);
                removeSymbol(searchSymbol);
                timeID = setTimeout(() => {
                    setVaildStock(true);
                }, 1500);
            }
            return () => {
                mounted = false;
                clearTimeout(timeID);
            };
        };
        fetch();
    }, [symbolList]);

    return (
        <>
            <div
                className={`text-center my-3 fw-bold text-danger ${
                    validStock ? "opacity-0" : "opacity-100"
                }`}
            >
                You don't have access to this resource.
            </div>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Change</th>
                        <th scope="col">Change%</th>
                        <th scope="col">High Price</th>
                        <th scope="col">Low Price</th>
                        <th scope="col">Open Price</th>
                        <th scope="col">Prev Close Price</th>
                        <th scope="col">
                            <FaTrashAlt className="text-danger" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => {
                        const changeClass =
                            stock.data.d > 0 ? "#46bc25" : "#FF2828";
                        const changeIcon =
                            stock.data.d > 0 ? <FaCaretUp /> : <FaCaretDown />;
                        return (
                            <tr
                                key={stock.symbol}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate(`/stock/${stock.symbol}`);
                                }}
                                className="table-stock text-center"
                            >
                                <th>{stock.symbol}</th>
                                <td>{stock.data.c.toFixed(2)}</td>
                                <td style={{ color: `${changeClass}` }}>
                                    {stock.data.d.toFixed(2)}
                                    {changeIcon}
                                </td>
                                <td style={{ color: `${changeClass}` }}>
                                    {stock.data.dp.toFixed(2)}
                                    {changeIcon}
                                </td>
                                <td>{stock.data.h.toFixed(2)}</td>
                                <td>{stock.data.l.toFixed(2)}</td>
                                <td>{stock.data.o.toFixed(2)}</td>
                                <td>{stock.data.pc.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn-sm btn-danger  d-inline-block delet-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeSymbol(stock.symbol);
                                        }}
                                    >
                                        remove
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default StockList;
