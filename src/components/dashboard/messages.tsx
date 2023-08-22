import { CSSProperties } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";
import "../../styles/message.scss";
import React from "react";
import { useMessageState } from "../../hooks";

export interface DashboardMessagesProps{
    className?: string;
    style?: CSSProperties;
    messageIcon?: string 
}



export const DashboardMessages: React.FC<DashboardMessagesProps> = ({className, style, messageIcon}) =>{
    const messageState = useMessageState();

    const close = () => messageState.close();

    return (
        <div>
            {messageState.panelOpen && (
                <div className={`card shadow border-primary border-2 ${className}`} style={{ backgroundColor: "rgba(240, 240, 240, 0.90)", height:"500px", width: "1000px", margin: "5px", borderRadius: "10px", ...style }}>
                    <Container fluid style={{ height:"100%" }}>
                        <Row style={{ height:"100%" }}>
                            <Col sm={3} className="text-center" style={{ height:"100%" }}>
                                <div className="mt-2" style={{ display:"flex",  cursor:"pointer"}}>
                                    <div className="border-primary text-primary bg-white" onClick={close} style={{ width:"30px", height: "30px", borderRadius:"50%"}}>
                                        <BiCaretDown size={20}/>
                                    </div>
                                </div>
                                <img className="img-fluid mt-4" src={messageIcon} style={{width: "120px"}}/><br/>
                                <h6  style={{fontWeight:"600", fontSize:"1.4em"}}>Messages</h6>
                                <p>Send and Receive messages to and from teachers and other staffs</p>
                                <div className="card p-2 mt-2 message-options">
                                    <label style={{fontWeight:"500", fontSize:"0.9em"}}>Start a Chat</label>
                                </div>
                                <div className="card p-2 mt-2 message-options">
                                    <label style={{fontWeight:"500", fontSize:"0.9em"}}>Recent Chats</label>
                                </div>
                            </Col>
                            <Col sm={4} style={{ height:"100%", padding:"0px", overflow:"auto", borderLeft:"solid 1px rgba(108, 99, 255, 0.6)"}}>
                            
                            </Col >
                            <Col sm={5} className="p-2" style={{display:"flex", flexDirection:"column", height: "100%", gap:"8px"}}>
                                <div style={{flexGrow:1,  overflowY:"auto", overflowX:"hidden" }}></div>
                                <div className="chat-input-container">
                                    <input className="chat-input" type="text" style={{flexGrow:1, height: "40px"}} placeholder="type your message" />
                                    <Button className="btn btn-primary" style={{ display:"flex", justifyContent:"center", alignItems:"center", padding:"10px", borderRadius:"10px", borderWidth:"0px", width: "40px", height: "40px"}}>
                                        <FaRegPaperPlane />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    );
}