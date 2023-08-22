import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tools } from '../src';

const meta: Meta<typeof Tools> = {
  component: Tools,
  title: "Tools",
};

type Story = StoryObj<typeof Tools>;

export const Defualt: Story = {
  render: () => <Tools>Bobby</Tools>,
};

export default meta;
