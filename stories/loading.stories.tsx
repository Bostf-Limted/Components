import { Meta, StoryObj } from '@storybook/react';
import { Loading } from "../src";
import React from 'react';

const meta: Meta<typeof Loading> = {
  component: Loading,
  title: "Loading",
};

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  render: () => <Loading />,
};

export default meta;
