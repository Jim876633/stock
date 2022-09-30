import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Stock from "./page/Stock";
import Error from "./page/Error";
import StockContextProvider from "./context/StockContextProvider";

function App() {
    return (
        <div className="container">
            <StockContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/stock/:symbol" element={<Stock />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </StockContextProvider>
        </div>
    );
}

export default App;
