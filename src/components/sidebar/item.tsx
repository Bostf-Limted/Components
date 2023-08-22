import React, { PropsWithChildren } from "react";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export interface ISideBarItemProps {
    className?: string, style?: CSSProperties, to?: string,
    title: string, expanded?: boolean
}

export interface SideBarItemProps extends PropsWithChildren<ISideBarItemProps>{}

const SideBarItem: React.FC<SideBarItemProps> = (props: SideBarItemProps) =>{
    const navigate = useNavigate();

    const onClicked = () => props.to && navigate(props.to);

    return (
        <div className={props.className} onClick={onClicked} style={{display: "flex", alignItems:"center", justifyContent: (!props.expanded ? "center" : ""), gap:8, cursor:"pointer", ...props.style,}}>
            { props.children }
            { props.expanded && (<div>{props.title}</div>) }
        </div>
    );
}

export default SideBarItem;