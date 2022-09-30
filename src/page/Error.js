import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="container text-center py-5">
            <h2 className="mt-5 " style={{ fontSize: "4rem" }}>
                Opps ! URL was not found
            </h2>
            <button
                className="btn btn-outline-primary my-5 fs-2"
                onClick={() => {
                    navigate("/");
                }}
            >
                Back to home
            </button>
        </div>
    );
};

export default Error;
