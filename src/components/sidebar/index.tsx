import { CSSProperties, PropsWithChildren, ReactElement, useEffect, useRef, useState } from "react";
import SideBarContent, { SideBarContentProps } from "./content";
import SideBarFooter, { SideBarFooterProps } from "./footer";
import SideBarHeader, { SideBarHeaderProps } from "./header";
import SideBarItem, { SideBarItemProps } from "./item";

import "../../styles/sidebar.scss";
import React from "react";

interface ISideBarProps {
    minWidth?: string | number,  maxWidth?:  string | number, headerHeight?: string | number,
    className?: string, style?: CSSProperties, clickable?: boolean
}

export interface SideBarProps extends PropsWithChildren<ISideBarProps>{}
  
export const SideBar: React.FC<SideBarProps> & { Content: React.FC<SideBarContentProps>, Item: React.FC<SideBarItemProps>, Footer: React.FC<SideBarFooterProps>, Header: React.FC<SideBarHeaderProps> } = (props: SideBarProps) => {
    const [expanded, setExpanded] = useState(false);
    const self = useRef<HTMLDivElement | null>(null);

    const minWidth = props.minWidth || "80px";
    const maxWidth = props.maxWidth || "300px";

    useEffect(function(){
        document.documentElement.style.setProperty('--min-width', minWidth.toString());
        document.documentElement.style.setProperty('--max-width', maxWidth.toString());
        if(self.current){
            self.current.onmouseenter = function() {
                setExpanded(prev => (props.clickable || false) ? prev : true);
            }
            self.current.onmouseleave = function (){
                setExpanded(prev => (props.clickable || false) ? prev : false);
            }
        }
    }, [minWidth, maxWidth, self, props.clickable]);
    
    let header: ReactElement<SideBarHeaderProps> | undefined;
    let contents: Array<ReactElement<SideBarContentProps> | any> = [];
    let footer: ReactElement<SideBarFooterProps> | undefined;

    const onHeaderClicked = () =>setExpanded(!expanded);
  
    React.Children.map(props.children, (child) => {
        if(React.isValidElement(child)){
            if (child.type === SideBarHeader) {
                header = React.cloneElement(child as ReactElement<SideBarHeaderProps>, { expanded, height: props.headerHeight, onPressed:onHeaderClicked, clickable: (props.clickable || false) });
            } else if (child.type === SideBarContent) {
                contents.push(React.cloneElement(child as ReactElement<SideBarContentProps>, { expanded }));
            } else if (child.type === SideBarFooter){
                footer = React.cloneElement(child as ReactElement<SideBarFooterProps>, { expanded: expanded });
            }else{
                contents.push(child);
            }
        }else{
            contents.push(child);
        }
    });
  
    return (
        <div className={`${props.className} sidebar ${expanded ? "expand" : "minimize"}`} ref={self} style={{ width: (expanded ? maxWidth : minWidth) , ...props.style }}>
            { header }
            <div style={{ flexGrow: 1}}>
                { contents }
            </div>
            { footer }
        </div>
    );
};

SideBar.Content = SideBarContent;
SideBar.Footer = SideBarFooter;
SideBar.Item = SideBarItem;
SideBar.Header = SideBarHeader;