import { Meta, StoryObj } from '@storybook/react';
import { Dashboard, MessageProvider, SideBar, useMessageState } from "../src";
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FaCog, FaHome, FaInfo, FaReact, FaSearch, FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: "Dash Board",
};

type Story = StoryObj<typeof Dashboard>;

const Test = () =>{
    const messageState = useMessageState();
    const toggle = () => messageState.toggle();

    return (
        <Dashboard>
            <SideBar clickable className='bg-light'>
                <SideBar.Header title="Story Book" className="bg-primary text-white p-3" style={{ fontSize:"14px", fontWeight:"600"}}>
                    <FaReact size={26}/>
                </SideBar.Header>
                <SideBar.Content className="text-grey-dark" style={{gap: 0, fontSize:"14px"}}>
                    <SideBar.Item title='Home' className="p-3 w-100" >
                        <FaHome size={20}/>
                    </SideBar.Item>
                    <SideBar.Item title="Users" className="p-3 w-100">
                        <FaUser size={20}/>
                    </SideBar.Item>
                </SideBar.Content>
                <SideBar.Footer className="text-grey-dark" style={{ gap:0, fontSize:"14px"}}>
                    <SideBar.Item title='Settings' className="p-3 w-100">
                        <FaCog size={20}/>
                    </SideBar.Item>
                    <SideBar.Item title="Help" className="p-3 w-100">
                        <FaInfo size={20}/>
                    </SideBar.Item>
                </SideBar.Footer>
            </SideBar>
            <Dashboard.Toolbar className='bg-light px-3'>
                <Dashboard.ToolBarGroup>
                    <Dashboard.ToolBarGroupIcon><FaCog  size={20} /></Dashboard.ToolBarGroupIcon>
                    <div>User</div>
                    <div>Setting</div>
                    <div>Logout</div>
                </Dashboard.ToolBarGroup>
            </Dashboard.Toolbar>
            <Dashboard.Main>
                <div style={{display: "flex", height: "100%", width: "100%", justifyContent:"center", alignItems: "center"}}>
                    <Button variant='outline-primary' onClick={toggle}>Toggle Message</Button>
                </div>
            </Dashboard.Main>
            <Dashboard.Messages />
            <Dashboard.Tools>Tools</Dashboard.Tools>
        </Dashboard>
    );
}

export const White: Story = {
    render: () => (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={ <MessageProvider><Test /></MessageProvider> } />
            </Routes>
        </BrowserRouter>
      ),
};

export default meta;
