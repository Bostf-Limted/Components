import React, { PropsWithChildren } from "react";
import { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";

interface IOptionBarProps{
    title: string, className?: string, style?: CSSProperties,
}

export interface OptionBarProps extends PropsWithChildren<IOptionBarProps>{}

export const OptionBar: React.FC<OptionBarProps> = (props:OptionBarProps) =>{
    const params = useParams();
    return (
        <div className={`px-4 py-4 w-100 shadow bg-white text-grey-dark mt-3 ${props.className}`} style={{ display:  "flex", justifyContent: "space-between", alignItems:"center", borderRadius:"10px", ...props.style }}>
            <h6 style={{ display:  "flex", alignItems:"center", fontWeight:"400", fontSize:"18px", gap:"10px"}}>{props.children}{props.title}</h6>
            <div>
                { !params.subOption && (params.option || "home") }
                { params.subOption && (<Link className="text-primary text" style={{ fontWeight:"600"}} to={`/dashboard/${params.option || ""}`}>{params.option || "home"}</Link>) }

                { !params.section && params.subOption && ` > ${params.subOption}`}
                { params.section && params.subOption && (
                    <label>
                        {` > `}<Link className="text-primary" style={{ fontWeight:"600"}} to={`/dashboard/${params.option}/${params.subOption || ""}`}>{params.subOption}</Link>
                    </label>)
                }
                
                { params.section && ` > ${params.section}`}
            </div>
        </div>
    );
}