import "../../styles/master-layout.scss";
import React, { CSSProperties, PropsWithChildren } from "react";

interface IMasterLayoutFillerProps{
    style?: CSSProperties,
    className?: string,
    space?: number
}

export interface MasterLayoutFillerProps extends PropsWithChildren<IMasterLayoutFillerProps>{}

const MasterLayoutFiller: React.FC<MasterLayoutFillerProps> = (props: MasterLayoutFillerProps) =>{
    const space = props.space || 6;

    return (
        <div className={`master-filler ${props.className}`} style={{...props.style, flex: space}}>
            {props.children}
        </div>
    );
}

export default MasterLayoutFiller;