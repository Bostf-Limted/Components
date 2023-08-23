import React, { useEffect, useState } from "react";
import TimeTable from "../../utils/timetable";

interface WeekssProps{
    month?: number;
    year?: number;
    day?: number
}

const Weeks: React.FC<WeekssProps> = () =>{
    const [table, setTable] = useState<TimeTable| null>();
    //const [drag, setDrag] = useState(0);

    const init = (element: HTMLCanvasElement | null) =>{
        if(element){
            let initCanvas = element.getContext("2d");
            if(initCanvas &&  !table){
                setTable( new TimeTable(initCanvas, true));
            }
        }
    }

    useEffect(()=>{
        if(table){
            table.clear();
            table.show();
        }
    },[ table]);
    

    return (
        <canvas ref={init} style={{ width: "100%", height:"500px", margin:"0px", padding:  "0px" }}></canvas>
    );
}

export default Weeks;