import { Meta, StoryObj } from '@storybook/react';

import { OptionBar } from "../src";
import React from 'react';

const meta: Meta<typeof OptionBar> = {
  component: OptionBar,
  title: "Option Bar",
};

type Story = StoryObj<typeof OptionBar>;

export const Defualt: Story = {
  render: () => <OptionBar title={"Story Book"} />,
};

export const Light: Story = {
  args: {
    title: "Home", className: "",
  },
  render: ({ title, className }) => <OptionBar title={title} className={className} />,
};

export default meta;
