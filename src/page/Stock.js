import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../api/fetch";
import StockChart from "../component/StockChart";
import StockDetail from "../component/StockDetail";
import { useNavigate } from "react-router-dom";

const Stock = () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        const fetch = async () => {
            const currentTime = Math.floor(Date.now() / 1000);
            let oneDay = currentTime - 24 * 60 * 60;
            if (new Date().getDay() === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60;
            }
            if (new Date().getDay() === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60;
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60;
            const oneYear = currentTime - 365 * 24 * 60 * 60;
            const timeSelect = [
                { from: oneDay, resolution: "30" },
                { from: oneWeek, resolution: "60" },
                { from: oneYear, resolution: "W" },
            ];
            try {
                const stockDetail = await Promise.all(
                    timeSelect.map((time) =>
                        fetchData(
                            `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${time.resolution}&from=${time.from}&to=${currentTime}&`,
                            symbol
                        )
                    )
                );
                const formatData = (data) => {
                    return data.c.map((item, index) => {
                        return { x: data.t[index] * 1000, y: item.toFixed(2) };
                    });
                };
                if (mounted) {
                    setChartData({
                        symbol: symbol,
                        day: formatData(stockDetail[0].data),
                        week: formatData(stockDetail[1].data),
                        year: formatData(stockDetail[2].data),
                    });
                }
            } catch (err) {
                console.log(err);
                navigate("/error");
            }
        };
        fetch();
        return () => {
            mounted = false;
        };
    }, [symbol]);

    return (
        <>
            {chartData && (
                <div className="container ">
                    <StockChart chartData={chartData} />
                    <StockDetail symbol={symbol} />
                </div>
            )}
        </>
    );
};

export default Stock;
