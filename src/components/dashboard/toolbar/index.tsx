import React from "react";
import { PropsWithChildren } from 'react'
import { CSSProperties } from "react";

interface IDashboardToolBarProps{
    className?: string, style?: CSSProperties, height?: string | number, title?: string, titleStyle?: CSSProperties, titleClassName?: string;
}
export interface DashboardToolBarProps extends PropsWithChildren<IDashboardToolBarProps>{}

const DashboardToolBar: React.FC<DashboardToolBarProps> = (props:DashboardToolBarProps) =>{
    const title = props.title || document.title;
    return (
        <div className={`dashboard-toolbar ${props.className}`} style={{ ...props.style, height: props.height }}>
            <h3 className={`dashboard-toolbar-title ${props.titleClassName}`} style={props.titleStyle}>{title}</h3>
            {props.children}
        </div>
    );
};

export default DashboardToolBar;