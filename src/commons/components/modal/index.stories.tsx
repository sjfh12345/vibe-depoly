import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';

const meta = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '모달 제목',
    },
    content: {
      control: 'text',
      description: '모달 내용',
    },
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달 스타일 종류',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '모달 버튼 액션 종류',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info_Single: Story = {
  args: {
    title: '안내',
    content: '정보 메시지를 표시하는 모달입니다.',
    variant: 'info',
    actions: 'single',
    theme: 'light',
    confirmText: '확인',
  },
};

export const Info_Dual: Story = {
  args: {
    title: '안내',
    content: '정보 메시지를 표시하는 모달입니다.',
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const Danger_Single: Story = {
  args: {
    title: '경고',
    content: '위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    confirmText: '확인',
  },
};

export const Danger_Dual: Story = {
  args: {
    title: '경고',
    content: '위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const Dark_Info_Single: Story = {
  args: {
    title: '다크 모드 안내',
    content: '다크 모드에서의 정보 메시지입니다.',
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    confirmText: '확인',
  },
};

export const Dark_Info_Dual: Story = {
  args: {
    title: '다크 모드 안내',
    content: '다크 모드에서의 정보 메시지입니다.',
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const Dark_Danger_Single: Story = {
  args: {
    title: '다크 모드 경고',
    content: '다크 모드에서의 위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'single',
    theme: 'dark',
    confirmText: '확인',
  },
};

export const Dark_Danger_Dual: Story = {
  args: {
    title: '다크 모드 경고',
    content: '다크 모드에서의 위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'dual',
    theme: 'dark',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const CustomButtonText: Story = {
  args: {
    title: '커스텀 버튼 텍스트',
    content: '확인과 취소 버튼의 텍스트를 변경할 수 있습니다.',
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    confirmText: '동의합니다',
    cancelText: '다음에 할게요',
  },
};
