import { Meta, StoryObj } from '@storybook/react';
import { Draggable } from "../src";
import React from 'react';

const meta: Meta<typeof Draggable> = {
  component: Draggable,
  title: "Draggable",
};

type Story = StoryObj<typeof Draggable>;

export const Sample: Story = {
    render: () => (
        <Draggable className='border-grey' style={{ borderRadius: "10px"}}>
            <Draggable.Header style={{ textAlign:"center" }}>drag me</Draggable.Header>
            <div className='bg-grey' style={{ width: "100px", height: "100px", display:"flex", justifyContent: "center", alignItems: "center", color:"white", fontSize: "12px", overflow: "hidden" }}>
                Drag Content
            </div>
        </Draggable>
    ),
};

export const Snappy: Story = {
    render: () => (
        <Draggable snapToEdge={true} className='border-grey' style={{ borderRadius: "10px"}}>
            <Draggable.Header style={{ textAlign:"center" }}>drag me</Draggable.Header>
            <div className='bg-grey' style={{ width: "100px", height: "100px", display:"flex", justifyContent: "center", alignItems: "center", color:"white", fontSize: "12px", overflow: "hidden" }}>
                Drag Content
            </div>
        </Draggable>
    ),
};

export default meta;
