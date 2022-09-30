import React from "react";
import StockList from "../component/StockList";
import Search from "../component/Search";

const Home = () => {
    return (
        <div>
            <Search />
            <StockList />
        </div>
    );
};

export default Home;
