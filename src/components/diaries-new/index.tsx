'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../../commons/components/button';
import Input from '../../commons/components/input';
import { EmotionType, EMOTION_INFO } from '../../commons/constants/enum';
import Modal from '../../commons/components/modal';
import { useDiaryForm } from './hooks/index.form.hook';

export default function DiariesNew() {
  const { form, isSubmitEnabled, handleSubmit } = useDiaryForm();
  const { register, watch, setValue } = form;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const selectedEmotion = watch('emotion');

  const handleEmotionSelect = (emotion: EmotionType) => {
    setValue('emotion', emotion);
  };
  
  const handleCloseButtonClick = () => {
    // 취소 확인 모달 표시
    setShowCancelModal(true);
  };

  const handleContinueWriting = () => {
    // 취소 확인 모달만 닫기
    setShowCancelModal(false);
  };

  const handleCancelWriting = () => {
    // 일기 작성을 취소하고 모달 닫기 - 즉시 닫기
    const closeEvent = new CustomEvent('diary-cancel-confirmed');
    window.dispatchEvent(closeEvent);
  };

  return (
    <div className={styles.wrapper}>
      {/* 헤더 영역 */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle} data-testid="diaries-new-title">일기 쓰기</h2>
      </div>
      
      {/* 콘텐츠 영역 */}
      <div className={styles.content}>
        {/* 감정 선택 영역 */}
        <div className={styles.emotionBox}>
          <p className={styles.emotionTitle}>오늘 기분은 어땟나요?</p>
          <div className={styles.emotionList}>
            {Object.values(EmotionType).map((emotion) => (
              <div
                key={emotion}
                className={`${styles.emotionItem} ${selectedEmotion === emotion ? styles.selected : ''}`}
                onClick={() => handleEmotionSelect(emotion)}
                data-testid={`emotion-${emotion.toLowerCase()}`}
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
        
        {/* 텍스트 입력 영역 */}
        <div className={styles.textArea}>
          {/* 제목 입력 영역 */}
          <div className={styles.inputTitle}>
            <label className={styles.label}>제목</label>
            <div className={styles.inputWrapper}>
              <Input
                {...register('title')}
                variant="primary"
                size="medium"
                placeholder="제목을 입력합니다."
                className={styles.titleInput}
                data-testid="diary-title-input"
              />
            </div>
          </div>
          
          {/* 내용 입력 영역 */}
          <div className={styles.inputContent}>
            <label className={styles.label}>내용</label>
            <div className={styles.textareaWrapper}>
              <textarea
                {...register('content')}
                placeholder="내용을 입력합니다."
                className={styles.contentTextarea}
                data-testid="diary-content-textarea"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 푸터 영역 */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          className={styles.cancelButton}
          onClick={handleCloseButtonClick}
          data-testid="diary-close-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          className={styles.saveButton}
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
          data-testid="diary-submit-button"
        >
          등록하기
        </Button>
      </div>

      {/* 취소 확인 모달 - 조건부 렌더링 */}
      {showCancelModal && (
        <div className={`${styles.cancelModalOverlay} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60`}>
          <div className="bg-white rounded-lg shadow-lg" data-testid="diary-cancel-modal-title">
            <Modal
              title="일기 작성 취소"
              content="일기 작성을 취소하시겠습니까? 작성하신 내용은 저장되지 않습니다."
              variant="info"
              actions="dual"
              confirmText="등록 취소"
              cancelText="계속 작성"
              onConfirm={handleCancelWriting}
              onCancel={handleContinueWriting}
            />
          </div>
        </div>
      )}
    </div>
  );
}