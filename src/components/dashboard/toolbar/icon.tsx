import React from "react";
import { CSSProperties, PropsWithChildren } from "react";

interface IDashboardToolBarGroupIconProps{
    style?: CSSProperties, className?: string,
}

export interface DashboardToolBarGroupIconProps extends PropsWithChildren<IDashboardToolBarGroupIconProps>{}

const DashboardToolBarGroupIcon = (props: DashboardToolBarGroupIconProps) =>{
    return (
        <div className={props.className} style={props.style}>
            { props.children }
        </div>
    );
}

export default DashboardToolBarGroupIcon;