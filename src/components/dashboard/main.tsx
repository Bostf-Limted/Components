import React, { PropsWithChildren } from "react";
import { CSSProperties } from "react";

interface IDashboardMainProps{
    className?: string, style?: CSSProperties, toolBarHeight?: string | number,
    onfinshed?: (element: HTMLDivElement)=>void
}
export interface DashboardMainProps extends PropsWithChildren<IDashboardMainProps>{}

const DashboardMain: React.FC<DashboardMainProps> = (props: DashboardMainProps) => {
    const finished = (element: HTMLDivElement|null) =>{
        if(element && props.onfinshed){
            props.onfinshed(element);
        }
    }

    return (
        <div ref={finished} className={props.className} style={{ ...props.style, overflowY:"auto", height:`calc(100% - ${props.toolBarHeight})` }}>
            {props.children}
        </div>
    );
};

export default DashboardMain;