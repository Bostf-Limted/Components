import "../../styles/master-layout.scss";
import React, { CSSProperties, PropsWithChildren } from "react";

interface IMasterLayoutContentProps{
    style?: CSSProperties,
    className?: string,
    space?: number,
}

export interface MasterLayoutContentProps extends PropsWithChildren<IMasterLayoutContentProps>{}

const MasterLayoutContent: React.FC<MasterLayoutContentProps> = (props: MasterLayoutContentProps) =>{
    const space = props.space || 4;
    return (
        <div className={`master-content ${props.className}`} style={{...props.style, flex: space }}>
            {props.children}
        </div>
    );
}

export default MasterLayoutContent;