import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const StockChart = ({ chartData }) => {
    const { symbol, day, week, year } = chartData;
    const [timeSelect, setTimeSelect] = useState("24h");
    const navigate = useNavigate();

    const time = ["24h", "7d", "1y"];
    const timeData = () => {
        switch (timeSelect) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
        }
    };
    const chartColor = () => {
        const color =
            timeData()[timeData().length - 1].y - timeData()[0].y >= 0
                ? "#46bc25"
                : "#FF2828";
        return color;
    };
    const stockChart = {
        options: {
            colors: [chartColor()],
            title: {
                text: symbol,
                align: "center",
                style: { fontSize: "25px" },
            },
            chart: {
                id: "stockData",
                animations: {
                    speed: 1000,
                },
            },
            xaxis: {
                type: "datetime",
            },
            tooltip: {
                x: {
                    format: "yyyy MMM dd HH:MM",
                },
            },
        },
        series: [
            {
                name: symbol,
                data: timeData(),
            },
        ],
    };

    const buttonClass = (time) => {
        const style =
            time === timeSelect ? "btn-primary" : "btn-outline-primary";
        return `btn ${style} mx-1 my-3`;
    };
    return (
        <div className="mt-5  w-75 mx-auto">
            <Chart
                options={stockChart.options}
                series={stockChart.series}
                type="area"
            />
            <div className="d-flex justify-content-end">
                {time.map((time, index) => (
                    <button
                        key={index}
                        className={buttonClass(time)}
                        onClick={() => {
                            setTimeSelect(time);
                        }}
                    >
                        {time}
                    </button>
                ))}
                <button
                    className="btn btn-outline-primary mx-1 my-3"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    back
                </button>
            </div>
        </div>
    );
};

export default StockChart;
