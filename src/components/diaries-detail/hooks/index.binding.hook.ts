'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EmotionType } from '../../../commons/constants/enum';

export interface DiaryDetailData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface UseDiaryBindingReturn {
  diary: DiaryDetailData | null;
  isLoading: boolean;
}

/**
 * 일기 상세 데이터 바인딩 훅
 * 
 * 다이나믹 라우팅된 [id]를 추출하여 로컬스토리지에서 해당 일기 데이터를 로드합니다.
 * 
 * @returns {UseDiaryBindingReturn} 일기 상세 데이터, 로딩 상태
 */
export function useDiaryBinding(): UseDiaryBindingReturn {
  const params = useParams();
  const [diary, setDiary] = useState<DiaryDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 다이나믹 라우팅된 [id] 추출
    const id = params?.id ? Number(params.id) : null;

    if (!id || isNaN(id)) {
      setIsLoading(false);
      return;
    }

    try {
      // 로컬스토리지에서 diaries 배열 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        setIsLoading(false);
        return;
      }

      const diaries: DiaryDetailData[] = JSON.parse(diariesJson);

      // id와 일치하는 일기 객체 찾기
      const foundDiary = diaries.find((d) => d.id === id);

      if (foundDiary) {
        setDiary(foundDiary);
      }
    } catch (error) {
      console.error('일기 데이터 로드 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  }, [params?.id]);

  return {
    diary,
    isLoading,
  };
}


