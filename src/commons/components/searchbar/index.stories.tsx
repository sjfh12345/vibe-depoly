import type { Meta, StoryObj } from '@storybook/react';
import Searchbar from './index';

const meta = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바 스타일 종류' 
    },
    size: { 
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: '검색바 크기' 
    },
    placeholder: { 
      control: 'text',
      description: '검색바 placeholder 텍스트'
    },
    disabled: { 
      control: 'boolean',
      description: '검색바 비활성화 상태'
    },
    showSearchIcon: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부'
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 적용'
    },
    className: { 
      control: 'text',
      description: '사용자 정의 클래스'
    },
    onSearch: { action: 'searched' },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' }
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    placeholder: '작은 검색바',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '중간 검색바',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    placeholder: '큰 검색바',
  },
};

export const WithoutSearchIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '검색 아이콘 없음',
    showSearchIcon: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '비활성화된 검색바',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '전체 너비 검색바',
    fullWidth: true,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  }
};

export const WithDefaultValue: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '기본값이 있는 검색바',
    defaultValue: '기본 검색어',
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '다크 테마 검색바',
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
    placeholder: '다크 테마 검색바',
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
    placeholder: '다크 테마 검색바',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: { value: 'dark' }
  }
};
