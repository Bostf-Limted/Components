import React, { CSSProperties } from "react";
import "../styles/circle-loading.scss";

export interface CircleLoadingProps{
    size?: number | string,
    style?: CSSProperties,
    color?: string,
    message: string
}

export const CircleLoading: React.FC<CircleLoadingProps> = (props: CircleLoadingProps) =>{
    const size = props.size || "26px";
    const color = props.color || "white";
    return (
        <div style={{ display: "flex", alignItems:"center", gap: 6 }}>
            <div className="circle-loading" style={{ ...props, height: size, width: size, borderBottomColor: color }}>
                <div className="circle-loading-inner" style={{ borderBottomColor: color as string, borderTopColor: color }}/>
            </div>
            <label style={{ fontSize: "14px", color }}>{ props.message }</label>
        </div>
    );
}