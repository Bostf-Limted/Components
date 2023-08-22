import "../../styles/master-layout.scss";

import React, { CSSProperties, PropsWithChildren, ReactElement } from "react"
import MasterLayoutFiller, { MasterLayoutFillerProps } from "./filler"
import MasterLayoutContent, { MasterLayoutContentProps } from "./content"

interface IMasterLayoutProps{
    classname?: string,
    style?: CSSProperties,
}

export interface MasterLayoutProps extends PropsWithChildren<IMasterLayoutProps>{}

export const MasterLayout: React.FC<MasterLayoutProps> & { Filler: React.FC<MasterLayoutFillerProps>, Content: React.FC<MasterLayoutContentProps> } = (props: MasterLayoutProps) =>{
    let filler: ReactElement<MasterLayoutFillerProps> | undefined;
    let content: ReactElement<MasterLayoutContentProps> | undefined;

    React.Children.map(props.children, (child) => {
        if(React.isValidElement(child)){
            if(child.type === MasterLayoutContent){
                content = child as ReactElement<MasterLayoutContentProps>;
            }else if(child.type === MasterLayoutFiller){
                filler = child as ReactElement<MasterLayoutFillerProps>;
            }
        }
    });

    return (
        <div className={`master-layout ${props.classname}`} style={props.style}>
            {filler}{content}
        </div>
    );
}

MasterLayout.Content = MasterLayoutContent;
MasterLayout.Filler = MasterLayoutFiller;