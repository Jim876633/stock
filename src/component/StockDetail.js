import React, { useEffect, useState } from "react";
import fetchData from "../api/fetch";

const StockDetail = ({ symbol }) => {
    const [stockDetail, setStockDetail] = useState({});

    useEffect(() => {
        let mounted = true;
        const fetch = async () => {
            const dataList = await fetchData(
                `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&`,
                symbol
            );
            if (mounted) {
                setStockDetail(dataList.data);
            }
        };
        fetch();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="row container mb-5 w-75 mx-auto rounded border border-primary py-3">
            <div className="col-6 border-end border-primary px-1">
                <div>
                    <span className="fw-bold">name : </span>
                    <img
                        src={stockDetail.logo}
                        alt="logo"
                        style={{ width: "1.5rem" }}
                        className="mx-1 rounded-circle"
                    />

                    {stockDetail.name}
                </div>
                <div>
                    <span className="fw-bold">country : </span>
                    {stockDetail.country}
                </div>
                <div>
                    <span className="fw-bold">ticker : </span>
                    {stockDetail.ticker}
                </div>
                <div>
                    <span className="fw-bold">ipo : </span>
                    {stockDetail.ipo}
                </div>
            </div>
            <div className="col-6 px-3">
                <div>
                    <span className="fw-bold">marketCap : </span>
                    {stockDetail.marketCapitalization?.toFixed(2)}
                </div>
                <div>
                    <span className="fw-bold">shareOutstanding : </span>
                    {stockDetail.shareOutstanding?.toFixed(2)}
                </div>
                <div>
                    <span className="fw-bold">exchange : </span>
                    {stockDetail.exchange}
                </div>

                <div>
                    <span className="fw-bold">weburl : </span>
                    <a href={stockDetail.weburl}>web</a>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;
