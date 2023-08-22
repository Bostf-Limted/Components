import { CSSProperties, PropsWithChildren, ReactElement } from "react";
import SideBarItem, { SideBarItemProps } from "./item";
import React from "react";

export interface SideBarContentProps {
    className?: string, style?: CSSProperties, gap?: number;
    children: ReactElement<SideBarItemProps>[] | ReactElement<SideBarItemProps>, expanded?: boolean
}

const SideBarContent: React.FC<SideBarContentProps> = (props: PropsWithChildren<SideBarContentProps>) => {
    const gap = props.gap || 20;
    const children = React.Children.map(props.children, (child) => {
        if(React.isValidElement(child) && child.type === SideBarItem){
            return React.cloneElement(child as ReactElement<SideBarItemProps>, { expanded: props.expanded });
        }else{
            return child;
        }
    });

    return (
        <div className={props.className} style={{ display:"flex", flexDirection:"column",  alignItems: (!props.expanded ? "center" : ""), height:"100%", gap: gap, ...props.style }}>
            { props.expanded && (<label className="ps-3 mt-4 text-grey" style={{ fontSize: "16px",  fontWeight:"300" }}>Main menu</label>) }
            { children }
        </div>
    );
};

export default SideBarContent;