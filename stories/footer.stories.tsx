import { Meta, StoryObj } from '@storybook/react';
import { Footer } from "../src";
import React from 'react';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Footer",
};

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => <Footer />,
};

export default meta;
