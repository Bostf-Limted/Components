import { CSSProperties, PropsWithChildren, ReactElement } from "react";
import SideBarItem, { SideBarItemProps } from "./item";
import React from "react";

export interface SideBarFooterProps {
    className?: string, style?: CSSProperties, gap?: number;
    children: ReactElement<SideBarItemProps>[] | ReactElement<SideBarItemProps>, expanded?: boolean
}

const SideBarFooter: React.FC<SideBarFooterProps> = (props: PropsWithChildren<SideBarFooterProps>) => {
    const gap = props.gap || 20;

    const children = React.Children.map(props.children, (child) => {
        if(React.isValidElement(child) && child.type === SideBarItem){
            return React.cloneElement(child as ReactElement<SideBarItemProps>, { expanded: props.expanded });
        }else{
            return child;
        }
    });

    return (
        <div className={props.className} style={{ display: "flex", flexDirection:"column", justifyContent:"center", alignItems: (!props.expanded ? "center" : ""), gap, ...props.style }}>
            <hr/>
            { props.expanded && (<label className="ms-3 mt-2 text-grey" style={{ fontSize: "16px",  fontWeight:"300" }}>Others</label>) }
            {children}
        </div>
    );
};

export default SideBarFooter;