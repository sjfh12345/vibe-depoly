import type { Meta, StoryObj } from '@storybook/react';
import { Selectbox } from './index';

const meta = {
  title: 'Commons/Components/Selectbox',
  component: Selectbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스 크기' 
    },
    options: { 
      control: 'object',
      description: '선택 옵션들'
    },
    value: { 
      control: 'text',
      description: '현재 선택된 값'
    },
    defaultValue: { 
      control: 'text',
      description: '기본 선택된 값'
    },
    placeholder: { 
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    disabled: { 
      control: 'boolean',
      description: '셀렉트박스 비활성화 상태'
    },
    fullWidth: { 
      control: 'boolean',
      description: '셀렉트박스 전체 너비 적용'
    },
    error: { 
      control: 'boolean',
      description: '에러 상태'
    },
    errorMessage: { 
      control: 'text',
      description: '에러 메시지'
    },
    onChange: { action: 'changed' }
  },
} satisfies Meta<typeof Selectbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    options: defaultOptions,
    placeholder: '선택하세요',
  },
};

export const WithDefaultValue: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    defaultValue: 'option2',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
    fullWidth: true,
  },
};

export const WithError: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: defaultOptions,
    placeholder: '선택하세요',
    error: true,
    errorMessage: '옵션을 선택해 주세요.',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2', disabled: true },
      { value: 'option3', label: '옵션 3' },
      { value: 'option4', label: '옵션 4', disabled: true },
      { value: 'option5', label: '옵션 5' },
    ],
    placeholder: '선택하세요',
  },
};

export const WithLongOptions: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: [
      { value: 'option1', label: '아주 긴 옵션 텍스트 1 - 이것은 매우 긴 옵션입니다' },
      { value: 'option2', label: '아주 긴 옵션 텍스트 2 - 이것은 매우 긴 옵션입니다' },
      { value: 'option3', label: '아주 긴 옵션 텍스트 3 - 이것은 매우 긴 옵션입니다' },
    ],
    placeholder: '선택하세요',
  },
};

export const ManyOptions: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: Array.from({ length: 15 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `옵션 ${i + 1}`,
    })),
    placeholder: '선택하세요',
  },
};
