'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { EmotionType } from '../../../commons/constants/enum';
import { RouteType, getDynamicRoutePath } from '../../../commons/constants/url';
import { useModal } from '../../../commons/providers/modal/modal.provider';
import Modal from '../../../commons/components/modal';

export interface DiaryFormData {
  emotion: EmotionType;
  title: string;
  content: string;
}

const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType, {
    message: '감정을 선택해주세요.',
  }),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export interface UseDiaryFormReturn {
  form: ReturnType<typeof useForm<DiaryFormData>>;
  isSubmitEnabled: boolean;
  handleSubmit: () => void;
}

/**
 * 일기 작성 폼 관리 훅
 * 
 * @returns {UseDiaryFormReturn} 폼 객체, 제출 활성화 상태, 제출 핸들러
 */
export function useDiaryForm(): UseDiaryFormReturn {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const form = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: 'onChange',
    defaultValues: {
      emotion: undefined as unknown as EmotionType,
      title: '',
      content: '',
    },
  });

  const { watch, handleSubmit: formHandleSubmit } = form;
  const emotion = watch('emotion');
  const title = watch('title');
  const content = watch('content');

  // 모든 인풋이 입력되었는지 확인
  const isSubmitEnabled = Boolean(emotion && title.trim() && content.trim());

  const onSubmit = (data: DiaryFormData) => {
    // 로컬스토리지에서 기존 diaries 가져오기
    const existingDiariesJson = localStorage.getItem('diaries');
    const existingDiaries = existingDiariesJson ? JSON.parse(existingDiariesJson) : [];

    // 새로운 ID 계산 (기존 diaries가 있으면 최대 ID+1, 없으면 1)
    const maxId = existingDiaries.length > 0 
      ? Math.max(...existingDiaries.map((diary: { id: number }) => diary.id))
      : 0;
    const newId = maxId + 1;

    // 새로운 일기 객체 생성
    const newDiary = {
      id: newId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      createdAt: new Date().toISOString(),
    };

    // 기존 diaries에 추가
    const updatedDiaries = [...existingDiaries, newDiary];

    // 로컬스토리지에 저장
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

    // 등록 완료 모달 표시
    openModal(
      <Modal
        title="일기 등록 완료"
        content="일기가 성공적으로 등록되었습니다."
        variant="info"
        actions="single"
        confirmText="확인"
        onConfirm={() => {
          // 모든 모달 닫기
          closeAllModals();
          // 상세 페이지로 이동
          const detailPath = getDynamicRoutePath(RouteType.DIARY_DETAIL, { id: String(newId) });
          router.push(detailPath);
        }}
      />
    );
  };

  const handleSubmit = () => {
    formHandleSubmit(onSubmit)();
  };

  return {
    form,
    isSubmitEnabled,
    handleSubmit,
  };
}

