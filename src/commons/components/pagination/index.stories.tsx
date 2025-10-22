import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';

const meta = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { 
      control: 'number', 
      description: '현재 페이지' 
    },
    totalPages: { 
      control: 'number', 
      description: '총 페이지 수' 
    },
    pageButtonCount: { 
      control: 'number',
      description: '한 번에 표시할 페이지 버튼 수'
    },
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '페이지네이션 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '페이지네이션 크기' 
    },
    onPageChange: { action: 'page changed' }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const Secondary: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'secondary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const Tertiary: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'tertiary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const Small: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'small',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const Medium: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const Large: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'large',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const MorePages: Story = {
  args: {
    currentPage: 7,
    totalPages: 20,
    pageButtonCount: 5,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

export const FewerButtons: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageButtonCount: 3,
    variant: 'primary',
    size: 'medium',
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};
