import "../../../styles/toolbar-groups.scss";
import React, { CSSProperties, ReactElement, useEffect, useRef, useState } from "react";
import { PropsWithChildren } from "react";
import { FaObjectGroup } from "react-icons/fa";
import DashboardToolBarGroupIcon, { DashboardToolBarGroupIconProps } from "./icon";

interface IDashboardToolBarGroupProps{
    style?: CSSProperties, className?: string,
    iconStyle?: CSSProperties, iconClassName?: string,
}

export interface DashboardToolBarGroupProps extends PropsWithChildren<IDashboardToolBarGroupProps>{}


const DashboardToolBarGroup: React.FC<DashboardToolBarGroupProps> = (props: DashboardToolBarGroupProps) =>{
    const [show, setShow] = useState<boolean>(false);
    const [itemProps, setItemProps] = useState<{ top?: string, left?: string, width?: string, height?: string }>({});
    const self = useRef<HTMLDivElement>(null);
    const items = useRef<HTMLDivElement>(null);


    let icon: ReactElement<DashboardToolBarGroupIconProps> | undefined;
    let contents: any[] = [];

    React.Children.forEach(props.children, (child) => {
        if(React.isValidElement(child)){
            if (child.type === DashboardToolBarGroupIcon){
                icon = React.cloneElement(child as ReactElement<DashboardToolBarGroupIconProps>, { style: props.iconStyle, className: props.iconClassName });
            }else{
                contents.push(child);
            }
        }else{
            contents.push(child);
        }
    });

    useEffect(()=>{
        if(self.current && items.current){
            let left = items.current.offsetLeft;

            let finalTop = self.current.offsetTop + self.current.offsetHeight + 10;
            if(left + items.current.offsetWidth > window.innerWidth){
                let finalLeft = window.innerWidth - items.current.offsetWidth;

                setItemProps({left: `${ finalLeft}px`, top: `${finalTop}px`, width: `${items.current.offsetWidth}px`, height: `${items.current.offsetHeight}px`});
            }else{
                let finalLeft = (self.current.offsetLeft + self.current.offsetWidth/2) - (items.current.offsetWidth / 2);

                setItemProps({left: `${ finalLeft}px`, top: `${finalTop}px`, width: `${items.current.offsetWidth}px`, height: `${items.current.offsetHeight}px`});
            }
        }
    }, [self, items, show]);

    return (
        <div>
            <div className={`toolbar-group-common toolbar-group-desktop ${props.className}`} style={{...props.style}}>{contents}</div>
            <div ref={self} className={`toolbar-group-icon ${props.iconClassName}`} onClick={ ()=> setShow(true)} style={{...props.iconStyle}}>
                { !icon ? <FaObjectGroup /> : icon }
            </div>
            { show && (<div className={`toolbar-group-common toolbar-group-mobile ${show ? 'toolbar-group-mobile-open' : ''} ${props.className}`} ref={items} style={{...props.style, top: itemProps.top, left: itemProps.left, width: itemProps.width, height: itemProps.height}} onClick={()=> setShow(false)}>
                {contents}
            </div>) }
        </div>
    );
}

export default DashboardToolBarGroup;