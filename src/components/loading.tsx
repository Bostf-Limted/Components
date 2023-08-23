import React from "react";
import { Triangle } from "react-loader-spinner";

export const Loading = () =>{
    return (
        <div className="bg-light" style={{ position:"absolute", top: "0", left: "0",  backgroundColor: "white", width: "100%", height: "100%", zIndex:"1000"}}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
                <Triangle height="100" width="100" color="#6c63ff" ariaLabel="triangle-loading" wrapperStyle={{ borderRadius: "3px" }} visible={true} />
            </div>
        </div>
    );
}