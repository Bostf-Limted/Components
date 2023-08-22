import { CSSProperties, PropsWithChildren} from "react";
import React from "react";
import { FaBars } from "react-icons/fa";

interface ISideBarHeaderProps {
    className?: string, style?: CSSProperties, expanded?: boolean, title: string, height?:string | number, onPressed?: ()=>void,
    clickable?: boolean, titleStyle?: CSSProperties
}

export interface SideBarHeaderProps extends PropsWithChildren<ISideBarHeaderProps>{}

const SideBarHeader: React.FC<SideBarHeaderProps> = (props: SideBarHeaderProps) => {
    const clicked = () =>{
        if(props.clickable && props.onPressed){
            props.onPressed();
        }
    }

    const showBars = () =>{
        if(!props.children){
            return true;
        }else if(props.children && props.expanded && props.clickable){
            return true;
        }
        return false;
    }

    return (
        <div className={props.className} style={{ ...props.style , display: "flex", justifyContent: props.expanded ? "space-between" : "center" , alignItems: "center", height:props.height}}>
            <div style={{ display:"flex", alignItems:"center" }}>
                { props.children && <span style={{ cursor: props.clickable ? "pointer" : "auto" }} onClick={clicked}>{props.children}</span>}
                { props.expanded && (<h4 className="ms-2" style={{ ...props.titleStyle, textOverflow:"clip", whiteSpace:"nowrap", marginBottom:"0px"}}>{props.title }</h4>) }
            </div>
            { showBars() && (<div onClick={clicked} style={{cursor:"pointer"}}>
                <FaBars size={20} />
            </div>) }
        </div>
    );
};

export default SideBarHeader;