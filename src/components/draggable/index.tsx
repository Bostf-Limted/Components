import React, { CSSProperties, MouseEvent, PropsWithChildren, ReactElement, useRef, useState } from "react"
import DraggableHeader, { DraggableHeaderProps } from "./header";
import { bounds } from "../../utils";

interface IDraggableProps{
    style?: CSSProperties, className?: string, snapToEdge?: boolean, boundsLeft?: number, onlyLeft?: boolean, onlyRight?: boolean,
    boundsRight?: number, boundsTop?: number, boundsBottom?: number
}

export interface DraggableProps extends PropsWithChildren<IDraggableProps>{}

const Draggable: React.FC<DraggableProps> & { Header: React.FC<DraggableHeaderProps> } = (props: DraggableProps) =>{
    const [values, setValues] = useState<{top?: string, left?: string , width?:string, height?:string }>();
    const ref = useRef<HTMLDivElement>(null);

    let header: ReactElement<DraggableHeaderProps> | undefined;
    let contents: Array<any> = [];

    React.Children.map(props.children, (child) => {
        if(React.isValidElement(child) && child.type === DraggableHeader) {
            header = React.cloneElement(child as ReactElement<DraggableHeaderProps>, { mouseDown:  (event: MouseEvent<HTMLDivElement>) =>{
                event = event || window.event;
                event.preventDefault();
        
                const element = ref.current as HTMLDivElement;
                const header = event.currentTarget;
                header.style.cursor = "grabbing";
        
                let [initX, initY] = [event.clientX, event.clientY];
        
                let finalboundsLeft = props.boundsLeft || 0;
                let finalboundsTop = props.boundsTop || 0;
            
                document.onmouseup = (innerEvent: any) =>{
                    innerEvent = innerEvent || window.event;
                    innerEvent.preventDefault();
        
                    document.onmouseup = null;
                    document.onmousemove = null;
                    header.style.cursor = "pointer";
        
                    let width = element.offsetWidth;
                    let height = element.offsetHeight;
                    let finalboundsRight = props.boundsRight || window.innerWidth - width;
        
                    if(props.snapToEdge){
                        let finalLeft = ((initX >= window.innerWidth/2) ? (finalboundsRight) : finalboundsLeft) + "px";
                        if(props.onlyLeft){
                            finalLeft = finalboundsLeft + "px";
                        }else if(props.onlyRight){
                            finalLeft = finalboundsRight + "px";
                        }
        
                        let finalWidth = width + "px";
                        let finalTop = element.offsetTop + "px";
                        let finalHeight = height + "px";
        
                        setValues({left: finalLeft, width: finalWidth, top: finalTop, height: finalHeight });
                    }
                };
            
                document.onmousemove = (innerEvent: any) =>{
                    innerEvent = innerEvent || window.event;
                    innerEvent.preventDefault();
        
                    let width = element.offsetWidth;
                    let height = element.offsetHeight;
        
                    let finalboundsRight = props.boundsRight || window.innerWidth - width;
                    let finalboundsBottom = props.boundsBottom || window.innerHeight - height;
        
                    const drag = { x: initX - innerEvent.clientX, y: initY - innerEvent.clientY};
                    
                    const finalTop = bounds(element.offsetTop - drag.y, finalboundsTop, finalboundsBottom) + "px";
                    const finalHeight = height + "px";
        
                    const finalLeft = bounds(element.offsetLeft - drag.x, finalboundsLeft, finalboundsRight) + "px";
                    const finalWidth = width + "px";

                    console.log( finalboundsBottom);
        
                    [initX, initY] = [innerEvent.clientX, innerEvent.clientY];
                    setValues({top: finalTop, height: finalHeight, left: finalLeft, width: finalWidth});
                };
            
            }}); 

        }else {
            contents.push(child);
        }
    });

    return (
        <div className={props.className} ref={ref} style={{position:"fixed", zIndex: 200, display:"flex", flexDirection: "column", ...props.style, ...values}}>
            {header}{ contents }
        </div>
    );
}

Draggable.Header = DraggableHeader;

export { Draggable };