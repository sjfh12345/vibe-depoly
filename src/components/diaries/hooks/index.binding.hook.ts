'use client';

import { useState, useEffect } from 'react';
import { EmotionType, EMOTION_INFO } from '../../../commons/constants/enum';

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface DiaryCard {
  id: number;
  title: string;
  date: string;
  emotion: EmotionType;
  image: string;
}

export interface UseDiariesBindingReturn {
  diaryCards: DiaryCard[];
  isLoading: boolean;
}

/**
 * 일기 목록 데이터 바인딩 훅
 * 
 * 로컬스토리지에서 diaries 배열을 로드하여 카드 형태로 변환합니다.
 * 
 * @returns {UseDiariesBindingReturn} 일기 카드 배열, 로딩 상태
 */
export function useDiariesBinding(): UseDiariesBindingReturn {
  const [diaryCards, setDiaryCards] = useState<DiaryCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // 로컬스토리지에서 diaries 배열 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        setDiaryCards([]);
        setIsLoading(false);
        return;
      }

      const diaries: DiaryData[] = JSON.parse(diariesJson);

      // 일기 데이터를 카드 형태로 변환
      const cards: DiaryCard[] = diaries.map((diary) => {
        // createdAt 문자열을 날짜 형식으로 변환 (YYYY. MM. DD)
        const date = new Date(diary.createdAt);
        const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;

        // emotion을 사용하여 이미지 가져오기
        const emotionImage = EMOTION_INFO[diary.emotion].images.medium;

        return {
          id: diary.id,
          title: diary.title,
          date: formattedDate,
          emotion: diary.emotion,
          image: emotionImage,
        };
      });

      setDiaryCards(cards);
    } catch (error) {
      console.error('일기 데이터 로드 중 오류 발생:', error);
      setDiaryCards([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    diaryCards,
    isLoading,
  };
}


