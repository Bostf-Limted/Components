import { useState } from "react";
import Months from "./months";
import "../../styles/calender.scss";
import Weeks from "./weeks";
import React from "react";
import { getMonthName } from "../../utils";

export const Calender = () =>{
    const current = new Date();
    const [day, setDay] = useState(current.getDate());
    const [month,  setMonth] = useState(current.getMonth());
    const [year, setYear] = useState(current.getFullYear());

    const [mode, setMode] = useState<"month"|"week"|"day">("month");

    const toMonth = () =>setMode("month");
    const toWeek = () => setMode("week");

    const nextMonth = () =>{
        if(month < 11){
            setMonth(month + 1);
        }else{
            setYear(year + 1);
            setMonth(0);
        }
    }

    const prevMonth = () =>{
        if(month > 0){
            setMonth(month - 1);
        }else{
            setYear(year - 1);
            setMonth(11);
        }
    }

    const currentMonth = ()  =>{
        setDay(current.getDate());
        setMonth(current.getMonth());
        setYear(current.getFullYear());
    }


    let viewingDate = new Date(year, month, day);
    
    return (
        <div>
            <div className="w-100 d-flex p-3" style={{ justifyContent:"space-between", alignItems:"center" }}>
                <div className="d-flex text-grey-dark" style={{ fontSize: "14px", alignItems:"center"}}>
                    <div className="card d-flex text-grey-dark" style={{ flexDirection:"row", alignItems:"center" }}>
                        <span className="px-3 py-1" onClick={prevMonth} style={{ fontSize:"18px", borderRight:"solid 1px #e0e0e0", cursor:"pointer" }}>{"<"}</span>
                        <span className="px-3 py-1" onClick={nextMonth} style={{ fontSize:"18px", cursor:"pointer" }}>{">"}</span>
                    </div> 
                    <span className="card px-2 py-1 ms-2 text-grey-dark" onClick={currentMonth} style={{ cursor:"pointer" }}>Today</span> 
                </div>
                <h6 className="text-grey-dark" style={{ fontWeight:"600" }}>{`${getMonthName(viewingDate)} ${viewingDate.getFullYear()}`}</h6>
                <div className="card d-flex text-grey-dark" style={{ fontSize: "14px", flexDirection:"row", alignItems:"center" }}>
                    <span className={"px-3 py-1 calender-options " + (mode === "month" ? "calender-active" : "")} onClick={toMonth} style={{ borderRight:"solid 1px #e0e0e0" }}>Month</span>
                    <span className={"px-3 py-1 calender-options " + (mode === "week" ? "calender-active" : "")} onClick={toWeek} style={{ cursor:"pointer" }}>Week</span>
                </div>
            </div>

            <div className="px-4 py-2">
                { mode === "month" && (<Months month={month} year={year}/>) }
                { mode === "week" && (<Weeks />) }
            </div>
        </div>
    )
}