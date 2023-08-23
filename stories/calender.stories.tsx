import { Meta, StoryObj } from '@storybook/react';
import { Calender } from "../src";
import React from 'react';

const meta: Meta<typeof Calender> = {
  component: Calender,
  title: "Calender",
};

type Story = StoryObj<typeof Calender>;

export const Default: Story = {
  render: () => <Calender />,
};

export default meta;
