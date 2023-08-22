import { CSSProperties, PropsWithChildren, useEffect, useState } from "react"
import { FaCog } from "react-icons/fa";
import "../styles/tools.scss";
import React from "react";

interface IToolsProps{
    className?: string, style?: CSSProperties,
}

export interface ToolsProps extends PropsWithChildren<IToolsProps>{}

export const Tools: React.FC<ToolsProps> = (props: PropsWithChildren<ToolsProps>) =>{
    const [ref, setRef] = useState<HTMLDivElement>();
    const [minimized, setMinimized] = useState(false);

    useEffect(()=>{
        if(ref){
            document.documentElement.style.setProperty("--tools-minimized-right", `${(-ref.offsetWidth + 42)}px`);
            setMinimized(true);
        }
    }, [ref]);

    const finished = (element: HTMLDivElement | null) =>{
        if(element  && !ref){
            setRef(element);
        }
    }

    const toggle = () => setMinimized(!minimized);

    return (
        <div className={`${ minimized ? "tools-minimized" : "tools-expanded"} ${props.className}`} ref={finished} style={{...props.style, position:"fixed", gap: 0, display:"flex", flexDirection:"row-reverse", zIndex: 100 , top: "30%", minHeight:"200px"}}>
            <div className="bg-white" style={{
                boxShadow:"-3px 8px 5px 2px rgba(119, 119, 119, 0.15)",
                minHeight:"100%", borderTopLeftRadius:"6px", borderBottomLeftRadius:"6px",}}>
                    {props.children}
            </div>
            <div onClick={toggle} className="text-primary bg-white" style={{
                marginTop:"40px",
                cursor:"pointer",
                borderTopLeftRadius:"6px",
                borderBottomLeftRadius:"6px",
                zIndex: 2,
                boxShadow:"-3px 8px 5px 0px rgba(119, 119, 119, 0.15)",
                width:"46px", height: "46px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <label className="tools-rotate" style={{display:"flex"}}>
                    <FaCog  size={22} />
                </label>
            </div>
        </div>
    );
}
