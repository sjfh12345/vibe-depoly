'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

export interface PictureData {
  id: number;
  image: string;
}

export interface UsePicturesBindingReturn {
  pictures: PictureData[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const DOG_API_BASE_URL = 'https://dog.ceo/api/breeds/image/random/6';

/**
 * 강아지 사진 목록 조회 API
 */
async function fetchDogPictures(): Promise<{ message: string[]; status: string }> {
  const response = await fetch(DOG_API_BASE_URL);
  if (!response.ok) {
    throw new Error('강아지 사진 목록 조회에 실패했습니다.');
  }
  return response.json();
}

/**
 * 강아지 사진 목록 데이터 바인딩 훅
 * 
 * 무한스크롤을 지원하는 강아지 사진 목록을 조회합니다.
 * 
 * @returns {UsePicturesBindingReturn} 강아지 사진 배열, 로딩 상태, 에러 상태, 다음 페이지 조회 함수
 */
export function usePicturesBinding(): UsePicturesBindingReturn {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['dogPictures'],
    queryFn: fetchDogPictures,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 항상 다음 페이지가 있는 것으로 간주 (무한스크롤)
      return allPages.length + 1;
    },
  });

  // 모든 페이지의 데이터를 평탄화하여 단일 배열로 변환
  const pictures: PictureData[] = data?.pages.flatMap((page, pageIndex) => {
    return page.message.map((imageUrl, imageIndex) => ({
      id: pageIndex * 6 + imageIndex + 1,
      image: imageUrl,
    }));
  }) ?? [];

  return {
    pictures,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage: hasNextPage ?? true,
    isFetchingNextPage,
  };
}

