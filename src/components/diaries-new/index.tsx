'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../commons/components/button';
import Input from '../../commons/components/input';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';

export default function DiariesNew() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // 폼 제출 로직 구현 예정
    console.log({
      emotion: selectedEmotion,
      title,
      content
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* 헤더 영역 - full * 24 */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>일기쓰기</h2>
      </div>
      
      {/* 첫 번째 gap 영역 - full * 40 */}
      <div className={styles.gap}></div>
      
      {/* 감정 선택 영역 - full * 64 */}
      <div className={styles.emotionBox}>
        <p className={styles.emotionTitle}>오늘 기분은 어땠나요?</p>
        <div className={styles.emotionList}>
          {Object.values(EmotionType).map((emotion) => (
            <div
              key={emotion}
              className={`${styles.emotionItem} ${selectedEmotion === emotion ? styles.selected : ''}`}
              onClick={() => handleEmotionSelect(emotion)}
            >
              <div className={styles.emotionRadio}>
                <img 
                  src={selectedEmotion === emotion ? '/icons/radio_fill_light_m.svg' : '/icons/radio_outline_light_m.svg'} 
                  alt="radio" 
                  className={styles.radioIcon}
                />
              </div>
              <div className={styles.emotionLabel}>
                {EMOTION_INFO[emotion].label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 두 번째 gap 영역 - full * 40 */}
      <div className={styles.gap}></div>
      
      {/* 제목 입력 영역 - full * 76 */}
      <div className={styles.inputTitle}>
        <Input
          variant="primary"
          size="large"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
          className={styles.titleInput}
        />
      </div>
      
      {/* 세 번째 gap 영역 - full * 24 */}
      <div className={styles.gap}></div>
      
      {/* 내용 입력 영역 - full * 156 */}
      <div className={styles.inputContent}>
        <textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
          className={styles.contentTextarea}
        />
      </div>
      
      {/* 네 번째 gap 영역 - full * 40 */}
      <div className={styles.gap}></div>
      
      {/* 푸터 영역 - full * 48 */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          className={styles.cancelButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          className={styles.saveButton}
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
