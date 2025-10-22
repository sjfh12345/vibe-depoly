import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';

const meta = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 필드 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '입력 필드 크기' 
    },
    placeholder: { 
      control: 'text',
      description: '입력 필드 placeholder 텍스트'
    },
    disabled: { 
      control: 'boolean',
      description: '입력 필드 비활성화 상태'
    },
    className: { 
      control: 'text',
      description: '사용자 정의 클래스'
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' }
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '텍스트를 입력하세요',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    placeholder: '텍스트를 입력하세요',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    placeholder: '텍스트를 입력하세요',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    placeholder: '작은 입력 필드',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '중간 입력 필드',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    placeholder: '큰 입력 필드',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '비활성화된 입력 필드',
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '기본값이 있는 입력 필드',
    defaultValue: '기본 텍스트',
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '다크 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  }
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    placeholder: '다크 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  }
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    placeholder: '다크 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  }
};
