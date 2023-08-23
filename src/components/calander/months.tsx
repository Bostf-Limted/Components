import React from "react";
import { Table } from "react-bootstrap";

const addDay = (date: Date, days: number) =>{
    return new Date(date.valueOf() + (1000 * 60 * 60 * 24 * days));
}

const firstEntry = (firstDayOfMonth: Date) =>{
    let offset = firstDayOfMonth.getDay() * (1000 * 60 * 60 * 24)
    return { first: new Date(firstDayOfMonth.valueOf() - offset), offset: firstDayOfMonth.getDay() };
}

interface DayData{
    within: boolean,
    present: boolean,
    day: number;
}


interface MonthsProps{
    month?: number;
    year?: number;
}

const Months: React.FC<MonthsProps> = (props: MonthsProps) =>{
    const current = new Date();
    const month = props.month === undefined ? current.getMonth() : props.month;
    const year = props.year === undefined ? current.getFullYear() : props.year;

    let dates: DayData[][] = [];
    let { first, offset } = firstEntry(new Date(year, month, 1));
    for(let i = 0; i < 5; i++){
        let init: DayData[] = []
        for(let j = 0; j <  7; j++){
            let index = i * 7 + j;
            let day = addDay(first, index);
            let within = (index) >= offset && (index - offset + 1) === day.getDate();
            let present = day.getMonth() === current.getMonth() && day.getDate() === current.getDate();

            init.push({within, present, day: day.getDate() });
        }
        dates.push(init);
    }

    return (
        <Table className="calender">
            <thead>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thur</th>
                <th>Fri</th>
                <th>Sat</th>
            </thead>
            <tbody>
                { dates.map((week) => (<tr>{ week.map(date=>(
                    <td className={ (date.present ? "present text-grey-dark text-bold" : (date.within ? "text-grey-dark text-bold" : "text-grey"))}>{date.day}</td>
                )) }</tr>)) }
            </tbody>
        </Table>
    );
}

export default Months;