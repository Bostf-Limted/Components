import { Meta, StoryObj } from '@storybook/react';
import { MasterLayout } from "../src";
import React from 'react';

const meta: Meta<typeof MasterLayout> = {
  component: MasterLayout,
  title: "Master layout",
};

type Story = StoryObj<typeof MasterLayout>;

export const sample: Story = {
  render: () => (
    <MasterLayout>
        <MasterLayout.Filler className='bg-grey'>

        </MasterLayout.Filler>
        <MasterLayout.Content className='bg-primary'>

        </MasterLayout.Content>
    </MasterLayout>
  ),
};

export default meta;
