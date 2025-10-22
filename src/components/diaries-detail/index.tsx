"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Button from '../../commons/components/button';
import Input from '../../commons/components/input';
import { EmotionType, getEmotionInfo } from '../../commons/constants/enum';

interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotionType: EmotionType;
  createdAt: string;
}

interface RetrospectItem {
  id: number;
  content: string;
  createdAt: string;
}

const mockData: DiaryData = {
  id: 1,
  title: '이것은 타이틀 입니다.',
  content: '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotionType: EmotionType.HAPPY,
  createdAt: '2024. 07. 12',
};

const DiariesDetail = () => {
  const emotionInfo = getEmotionInfo(mockData.emotionType);
  const [retrospectInput, setRetrospectInput] = useState('');
  const [retrospects, setRetrospects] = useState<RetrospectItem[]>([
    {
      id: 1,
      content: '이것은 회고 내용입니다.',
      createdAt: '2024. 07. 13'
    },
    {
      id: 2,
      content: '회고를 추가했습니다.',
      createdAt: '2024. 07. 14'
    }
  ]);
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockData.content);
    alert('내용이 클립보드에 복사되었습니다.');
  };
  
  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim() !== '') {
      const newRetrospect = {
        id: retrospects.length + 1,
        content: retrospectInput,
        createdAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        }).replace(/\. /g, '.').replace(/\.$/, '')
      };
      
      setRetrospects([...retrospects, newRetrospect]);
      setRetrospectInput('');
    }
  };

  return (
    <div className={`${styles.container} ${styles.main}`}>
      <div className={styles.gap}></div>
      
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{mockData.title}</h2>
        </div>
        <div className={styles.emotionSection}>
          <div className={styles.emotionInfo}>
            <Image 
              src={emotionInfo.images.small} 
              alt={emotionInfo.label} 
              width={32} 
              height={32} 
            />
            <span className={styles.emotionLabel}>{emotionInfo.label}</span>
          </div>
          <div className={styles.dateInfo}>
            <span className={styles.date}>{mockData.createdAt}</span>
            <span className={styles.dateLabel}>작성</span>
          </div>
        </div>
      </div>
      
      <div className={styles.gap}></div>
      
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <p className={styles.contentLabel}>내용</p>
          <p className={styles.contentText}>{mockData.content}</p>
        </div>
        <div className={styles.contentActions}>
          <button className={styles.copyButton} onClick={handleCopyContent}>
            <Image 
              src="/icons/copy_outline_light_m.svg" 
              alt="내용 복사" 
              width={24} 
              height={24} 
            />
            <span>내용 복사</span>
          </button>
        </div>
      </div>
      
      <div className={styles.gap}></div>
      
      <div className={styles.detailFooter}>
        <div className={styles.buttonGroup}>
          <Button 
            variant="secondary" 
            size="medium"
            className={`${styles.editButton} ${styles.buttonOverride} ${styles.secondaryButtonOverride}`}
          >
            수정
          </Button>
          <Button 
            variant="secondary" 
            size="medium"
            className={`${styles.deleteButton} ${styles.buttonOverride} ${styles.secondaryButtonOverride}`}
          >
            삭제
          </Button>
        </div>
      </div>
      
      <div className={styles.gap}></div>
      
      <div className={styles.retrospectInput}>
        <div className={styles.retrospectInputWrapper}>
          <Input 
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            placeholder="회고를 입력하세요" 
            variant="primary"
            size="medium"
            className={styles.retrospectInputField}
          />
          <button 
            type="button"
            onClick={handleRetrospectSubmit}
            className={styles.customRetrospectButton}
          >
            입력
          </button>
        </div>
      </div>
      
      <div className={styles.gap}></div>
      
      <div className={styles.retrospectList}>
        {retrospects.map((item) => (
          <div key={item.id} className={styles.retrospectItem}>
            <p className={styles.retrospectContent}>{item.content}</p>
            <p className={styles.retrospectDate}>{item.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
