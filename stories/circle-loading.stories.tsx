import { Meta, StoryObj } from '@storybook/react';
import { CircleLoading } from "../src";
import React from 'react';

const meta: Meta<typeof CircleLoading> = {
  component: CircleLoading,
  title: "Circle Loading",
};

type Story = StoryObj<typeof CircleLoading>;

export const White: Story = {
  render: () => <CircleLoading message='Loading' size={"26px"}  />,
};

export const Colored: Story = {
  args: {
    color: "#4580ff", size: "26px",
  },
  render: ({ color, size }) => <CircleLoading message='Loading' color={color} size={size}/>,
};

export default meta;
