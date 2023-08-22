import "../../styles/dashboard.scss";
import { CSSProperties, ReactElement, useState } from "react";
import React from "react";
import { SideBar, SideBarProps } from "../sidebar";
import DashboardToolBar, { DashboardToolBarProps } from "./toolbar";
import DashboardMain, { DashboardMainProps } from "./main";
import { FaHandPointLeft, FaHandPointUp } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DashboardMessages, DashboardMessagesProps } from "./messages";
import { ToolsProps, Tools } from "../tools";
import { useMessageState } from "../../hooks";
import DashboardToolBarGroupIcon, { DashboardToolBarGroupIconProps } from "./toolbar/icon";
import DashboardToolBarGroup from "./toolbar/group";

interface DashBoardProps {
    className?: string, style?: CSSProperties, toolBarHeight?: number | string, sideBarWidth?: number | string,
    children: Array<ReactElement<DashboardToolBarProps> | ReactElement<SideBarProps> | ReactElement<DashboardMainProps> |  ReactElement<DashboardMessagesProps> | ReactElement<ToolsProps>>
}

const Dashboard : React.FC<DashBoardProps> & { Toolbar: React.FC<DashboardToolBarProps>, Main: React.FC<DashboardMainProps>, Messages: React.FC<DashboardMessagesProps>,  Tools: React.FC<ToolsProps>, ToolBarGroup: React.FC<DashboardToolBarProps>, ToolBarGroupIcon: React.FC<DashboardToolBarGroupIconProps> } = (props: DashBoardProps) =>{
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const messageState = useMessageState();
    const [showUpButton, setShowUpButton] = useState(false);
    const [mainElement,  setMainElement] = useState<HTMLDivElement| undefined>(undefined);
    
    const toolBarHeight = props.toolBarHeight || "65px";
    const sideBarWidth = props.sideBarWidth || "65px";

    let sidebar: ReactElement<SideBarProps> | undefined;
    let toolbar: ReactElement<DashboardToolBarProps> | undefined;
    let main: ReactElement<DashboardMainProps> | undefined;
    let tools: ReactElement<ToolsProps> | undefined;
    let messages: ReactElement<DashboardMessagesProps> | undefined;
  
    props.children.map((child) => {
        if(child.type === SideBar) {
            sidebar = React.cloneElement(child as ReactElement<SideBarProps>, { headerHeight: toolBarHeight, minWidth: sideBarWidth });
        }else if (child.type === DashboardMain) {
            main = React.cloneElement(child as ReactElement<DashboardMainProps>, { toolBarHeight: toolBarHeight, onfinshed: (element: HTMLDivElement) => setMainElement(element), });
        }else if (child.type === DashboardToolBar){
            toolbar = React.cloneElement(child as ReactElement<DashboardToolBarProps>, { height: toolBarHeight });
        }else if(child.type === Tools){
            tools = child as ReactElement<ToolsProps>;
        }else if(child.type === DashboardMessages){
            messages = child as ReactElement<DashboardMessagesProps>;
        }
    });

    if(mainElement){
        mainElement.addEventListener("scroll", function (){
            if (!showUpButton && mainElement.scrollTop > 20) {
                setShowUpButton(true);
            } else if(showUpButton && mainElement.scrollTop <= 20){
                setShowUpButton(false);
            }
        });
    }

    const back = () =>{
        let prev = location.pathname.slice(0, location.pathname.lastIndexOf("/"));
        navigate(prev);
    }
    
    const up = () => mainElement?.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className={`${props.className} dashboard`} style={{ ...props.style }}>
            {sidebar}
            <div style={{ marginLeft:sideBarWidth, flexGrow:1, overflowX:"hidden" }}>
                { toolbar }{main}
            </div>
            <div style={{ display:"flex", flexDirection:"column",  justifyContent:"end", alignItems:"end", position:"fixed", bottom: "0px" ,right: "0px"}}>
                {!messageState.panelOpen && showUpButton && (<div className="shadow rounded m-1 border border-blue px-1" style={{ cursor:"pointer" }} >
                    <div className="text-blue m-2" style={{ cursor:"pointer" }} onClick={up}>
                        <FaHandPointUp size={22} />
                    </div>
                </div>)}
                <div style={{ display:"flex", justifyContent:"end", alignItems:"end" }}>
                    { params.subOption && (
                        <div className="shadow rounded m-1 border border-primary px-1" style={{ cursor:"pointer" }} onClick={back}>
                            <div className="text-primary m-2">
                                <FaHandPointLeft size={22} />
                            </div>
                        </div>)
                    }
                    { messages }
                </div>
            </div>
            { tools }
        </div>
    );
}

Dashboard.Main = DashboardMain;
Dashboard.Toolbar = DashboardToolBar;
Dashboard.Tools = Tools;
Dashboard.Messages = DashboardMessages;
Dashboard.ToolBarGroup = DashboardToolBarGroup;
Dashboard.ToolBarGroupIcon = DashboardToolBarGroupIcon;

export { Dashboard };