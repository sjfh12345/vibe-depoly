'use client';

import { useRouter } from 'next/navigation';
import { RouteType, getDynamicRoutePath } from '../../../commons/constants/url';

export interface UseDiariesLinkRoutingReturn {
  handleDiaryCardClick: (id: number) => void;
}

/**
 * 일기 카드 클릭 시 라우팅 처리 훅
 * 
 * 일기 카드를 클릭하면 상세 페이지로 이동합니다.
 * 
 * @returns {UseDiariesLinkRoutingReturn} 일기 카드 클릭 핸들러
 */
export function useDiariesLinkRouting(): UseDiariesLinkRoutingReturn {
  const router = useRouter();

  /**
   * 일기 카드 클릭 핸들러
   * @param id 일기 ID
   */
  const handleDiaryCardClick = (id: number) => {
    const path = getDynamicRoutePath(RouteType.DIARY_DETAIL, { id: String(id) });
    router.push(path);
  };

  return {
    handleDiaryCardClick,
  };
}

