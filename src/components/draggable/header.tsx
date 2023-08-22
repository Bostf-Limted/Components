import React, { PropsWithChildren } from "react";
import { CSSProperties, MouseEvent } from "react"

interface IDraggableHeaderProps{
    style?: CSSProperties, className?: string, mouseDown?: (event: MouseEvent<HTMLDivElement>) =>  void
}

export interface DraggableHeaderProps extends PropsWithChildren<IDraggableHeaderProps>{}

const DraggableHeader: React.FC<DraggableHeaderProps> = (props: DraggableHeaderProps) =>{
    return (<div onMouseDown={props.mouseDown} className={props.className} style={{cursor:"pointer", ...props.style}}>{props.children}</div>);
}

export default DraggableHeader;