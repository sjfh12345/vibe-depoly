import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';

const meta = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모달 컴포넌트는 사용자에게 중요한 정보를 표시하거나 특정 작업의 확인을 요청하는 데 사용됩니다. 모달은 info 또는 danger 스타일로 표시될 수 있으며, 단일 버튼 또는 이중 버튼 액션을 지원합니다.',
      },
    },
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

export const InfoSingle: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본적인 정보 모달로, 단일 확인 버튼을 제공합니다.',
      },
    },
  },
  args: {
    title: '안내',
    content: '정보 메시지를 표시하는 모달입니다.',
    variant: 'info',
    actions: 'single',
    theme: 'light',
    confirmText: '확인',
  },
};

export const InfoDual: Story = {
  parameters: {
    docs: {
      description: {
        story: '정보 모달로, 확인 및 취소 두 개의 버튼을 제공합니다.',
      },
    },
  },
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

export const DangerSingle: Story = {
  parameters: {
    docs: {
      description: {
        story: '위험한 작업을 알리는 경고 모달로, 단일 확인 버튼을 제공합니다.',
      },
    },
  },
  args: {
    title: '경고',
    content: '위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    confirmText: '확인',
  },
};

export const DangerDual: Story = {
  parameters: {
    docs: {
      description: {
        story: '위험한 작업을 알리는 경고 모달로, 삭제와 취소 버튼을 제공합니다.',
      },
    },
  },
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

export const DarkInfoSingle: Story = {
  args: {
    title: '다크 모드 안내',
    content: '다크 모드에서의 정보 메시지입니다.',
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    confirmText: '확인',
  },
};

export const DarkInfoDual: Story = {
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

export const DarkDangerSingle: Story = {
  args: {
    title: '다크 모드 경고',
    content: '다크 모드에서의 위험한 작업을 수행합니다. 계속하시겠습니까?',
    variant: 'danger',
    actions: 'single',
    theme: 'dark',
    confirmText: '확인',
  },
};

export const DarkDangerDual: Story = {
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
