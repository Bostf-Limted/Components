import { Meta, StoryObj } from '@storybook/react';
import { SideBar } from "../src";
import React from 'react';
import { FaCog, FaHome, FaInfo, FaReact, FaUser } from 'react-icons/fa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  title: "Side Bar",
};

type Story = StoryObj<typeof SideBar>;

const SampleComponent = (props:{clickable?:boolean}) =>{
    return (
        <SideBar className='bg-light' clickable={props.clickable}>
            <SideBar.Header title="Story Book" className="bg-primary-dark text-white p-3" style={{ fontSize:"14px", fontWeight:"600"}} />
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
    );
}

const WithLogoComponent = (props:{clickable?:boolean}) =>{
    return (
        <SideBar className='bg-light' clickable={props.clickable}>
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
    );
}

export const Sample: Story = {
    args: {
        clickable: false,
    },
    render: ({clickable}) => (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={ <SampleComponent clickable={clickable}/> } />
            </Routes>
        </BrowserRouter>
    ),
};

export const WithLogo: Story = {
    args: {
        clickable: true,
    },
    render: ({clickable}) => (
      <BrowserRouter>
          <Routes>
              <Route path='*' element={ <WithLogoComponent clickable={clickable}/> } />
          </Routes>
      </BrowserRouter>
     
    ),
};

export default meta;