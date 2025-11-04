'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Selectbox from '../../commons/components/selectbox';
import Searchbar from '../../commons/components/searchbar';
import Button from '../../commons/components/button';
import Pagination from '../../commons/components/pagination';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';
import { useDiariesModal } from './hooks/index.link.modal.hook';

// 일기 카드를 위한 인터페이스 정의
interface DiaryCard {
  id: number;
  title: string;
  date: string;
  emotion: EmotionType;
  image: string;
}

// 모크 데이터 생성
const mockDiaryCards: DiaryCard[] = [
  {
    id: 1,
    title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.SAD,
    image: EMOTION_INFO[EmotionType.SAD].images.medium
  },
  {
    id: 2,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.SURPRISE,
    image: EMOTION_INFO[EmotionType.SURPRISE].images.medium
  },
  {
    id: 3,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.ANGRY,
    image: EMOTION_INFO[EmotionType.ANGRY].images.medium
  },
  {
    id: 4,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.HAPPY,
    image: EMOTION_INFO[EmotionType.HAPPY].images.medium
  },
  {
    id: 5,
    title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.ETC,
    image: EMOTION_INFO[EmotionType.ETC].images.medium
  },
  {
    id: 6,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.SURPRISE,
    image: EMOTION_INFO[EmotionType.SURPRISE].images.medium
  },
  {
    id: 7,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.ANGRY,
    image: EMOTION_INFO[EmotionType.ANGRY].images.medium
  },
  {
    id: 8,
    title: '타이틀 영역 입니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.HAPPY,
    image: EMOTION_INFO[EmotionType.HAPPY].images.medium
  },
  {
    id: 9,
    title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.SAD,
    image: EMOTION_INFO[EmotionType.SAD].images.medium
  },
  {
    id: 10,
    title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    date: '2024. 03. 12',
    emotion: EmotionType.ETC,
    image: EMOTION_INFO[EmotionType.ETC].images.medium
  },
];

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 전체 페이지 수
  const { openDiaryWriteModal } = useDiariesModal();
  
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };
  
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // 여기서 검색 기능 구현 가능
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 필요한 작업 수행
  };
  return (
    <div className={`${styles.container} ${styles.searchbarHelper} ${styles.leftIconHelper}`} data-testid="diaries-page-content">
      {/* 첫 번째 gap 영역 - 32px */}
      <div className={styles.gap}></div>
      
      {/* 검색 영역 - 1168 x 48px */}
      <div className={styles.search}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchLeft}>
            <Selectbox 
              variant="primary" 
              size="medium" 
              options={[
                { value: 'all', label: '전체' },
                { value: 'happy', label: '행복한' },
                { value: 'sad', label: '슬픈' },
                { value: 'angry', label: '화난' },
                { value: 'surprised', label: '놀란' },
                { value: 'etc', label: '기타' }
              ]} 
              value={filterValue}
              onChange={handleFilterChange}
              className={styles.filterSelect}
              placeholder="전체"
            />
            <Searchbar 
              variant="primary" 
              size="medium" 
              className={styles.searchInput}
              placeholder="검색어를 입력해 주세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
            />
          </div>
          <div className={styles.searchRight}>
            <Button 
              variant="primary" 
              size="large" 
              className={styles.writeButton}
              leftIconSrc="/icons/plus_outline_light_m.svg"
              iconSize={14}
              onClick={openDiaryWriteModal}
              data-testid="diary-new-button"
            >
              일기쓰기
            </Button>
          </div>
        </div>
      </div>
      
      {/* 두 번째 gap 영역 - 42px */}
      <div className={styles.gap}></div>
      
      {/* 메인 컨텐츠 영역 - 1168 x 936px */}
      <div className={styles.main}>
        <div className={styles.diaryGrid}>
          {mockDiaryCards.map((card) => (
            <div key={card.id} className={styles.diaryCard}>
              <div className={styles.cardImage} style={{ backgroundImage: `url(${card.image})` }}>
                <div className={styles.closeIcon}></div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span 
                    className={styles.emotionLabel}
                    style={{ color: EMOTION_INFO[card.emotion].color }}
                  >
                    {EMOTION_INFO[card.emotion].label}
                  </span>
                  <span className={styles.date}>{card.date}</span>
                </div>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 세 번째 gap 영역 - 40px */}
      <div className={styles.gap}></div>
      
      {/* 페이지네이션 영역 - 1168 x 32px */}
      <div className={styles.pagination}>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          variant="primary"
          size="medium"
          theme="light"
          pageButtonCount={5}
          className={styles.paginationComponent}
        />
      </div>
      
      {/* 네 번째 gap 영역 - 40px */}
      <div className={styles.gap}></div>
    </div>
  );
}
