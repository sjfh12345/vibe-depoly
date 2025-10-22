import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toggle from './index';

const meta = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글 버튼 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '토글 버튼 크기' 
    },
    checked: { 
      control: 'boolean',
      description: '토글 버튼 상태'
    },
    disabled: { 
      control: 'boolean',
      description: '토글 버튼 비활성화 상태'
    },
    className: { 
      control: 'text',
      description: '사용자 정의 클래스'
    },
    onChange: { action: 'changed' }
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// 제어 가능한 토글 컴포넌트를 위한 래퍼
const ControlledToggle = (args: Partial<import('./index').ToggleProps>) => {
  const [checked, setChecked] = useState(args.checked || false);
  
  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        args.onChange?.(e);
      }}
    />
  );
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Checked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    checked: true,
  },
  render: (args) => <ControlledToggle {...args} />
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
  render: (args) => <ControlledToggle {...args} />
};

export const DisabledChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    checked: true,
    disabled: true,
  },
  render: (args) => <ControlledToggle {...args} />
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  },
  render: (args) => <ControlledToggle {...args} />
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  },
  render: (args) => <ControlledToggle {...args} />
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  },
  render: (args) => <ControlledToggle {...args} />
};
