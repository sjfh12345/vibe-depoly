import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '버튼 크기' 
    },
    disabled: { 
      control: 'boolean',
      description: '버튼 비활성화 상태'
    },
    fullWidth: { 
      control: 'boolean',
      description: '버튼 전체 너비 적용'
    },
    children: { 
      control: 'text',
      description: '버튼 내용'
    },
    leftIconSrc: { 
      control: 'text',
      description: '왼쪽 아이콘 경로'
    },
    rightIconSrc: { 
      control: 'text',
      description: '오른쪽 아이콘 경로'
    },
    iconSize: { 
      control: 'number',
      description: '아이콘 크기'
    },
    onClick: { action: 'clicked' }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: '버튼',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    children: '버튼',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: '큰 버튼',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '비활성화 버튼',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '전체 너비 버튼',
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '왼쪽 아이콘 버튼',
    leftIconSrc: '/icons/plus_outline_light_m.svg',
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '오른쪽 아이콘 버튼',
    rightIconSrc: '/icons/arrow_drop_down.svg',
  },
};
