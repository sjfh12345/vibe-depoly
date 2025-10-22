'use client';

import { useState } from 'react';
import Toggle from '@/commons/components/toggle';
import styles from './styles.module.css';

export default function ToggleTestPage() {
  const [toggleState, setToggleState] = useState({
    primary: {
      small: false,
      medium: false,
      large: false
    },
    secondary: {
      small: false,
      medium: false,
      large: false
    },
    tertiary: {
      small: false,
      medium: false,
      large: false
    }
  });

  const handleToggleChange = (variant: string, size: string) => {
    setToggleState(prev => ({
      ...prev,
      [variant]: {
        ...prev[variant as keyof typeof prev],
        [size]: !prev[variant as keyof typeof prev][size as keyof typeof prev[keyof typeof prev]]
      }
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>토글 컴포넌트 테스트</h1>

      <section className={styles.section}>
        <h2>Primary 토글</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleItem}>
            <label>Small:</label>
            <Toggle
              variant="primary"
              size="small"
              checked={toggleState.primary.small}
              onChange={() => handleToggleChange('primary', 'small')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Medium:</label>
            <Toggle
              variant="primary"
              size="medium"
              checked={toggleState.primary.medium}
              onChange={() => handleToggleChange('primary', 'medium')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Large:</label>
            <Toggle
              variant="primary"
              size="large"
              checked={toggleState.primary.large}
              onChange={() => handleToggleChange('primary', 'large')}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Secondary 토글</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleItem}>
            <label>Small:</label>
            <Toggle
              variant="secondary"
              size="small"
              checked={toggleState.secondary.small}
              onChange={() => handleToggleChange('secondary', 'small')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Medium:</label>
            <Toggle
              variant="secondary"
              size="medium"
              checked={toggleState.secondary.medium}
              onChange={() => handleToggleChange('secondary', 'medium')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Large:</label>
            <Toggle
              variant="secondary"
              size="large"
              checked={toggleState.secondary.large}
              onChange={() => handleToggleChange('secondary', 'large')}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tertiary 토글</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleItem}>
            <label>Small:</label>
            <Toggle
              variant="tertiary"
              size="small"
              checked={toggleState.tertiary.small}
              onChange={() => handleToggleChange('tertiary', 'small')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Medium:</label>
            <Toggle
              variant="tertiary"
              size="medium"
              checked={toggleState.tertiary.medium}
              onChange={() => handleToggleChange('tertiary', 'medium')}
            />
          </div>
          <div className={styles.toggleItem}>
            <label>Large:</label>
            <Toggle
              variant="tertiary"
              size="large"
              checked={toggleState.tertiary.large}
              onChange={() => handleToggleChange('tertiary', 'large')}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>비활성화된 토글</h2>
        <div className={styles.toggleRow}>
          <div className={styles.toggleItem}>
            <label>비활성화:</label>
            <Toggle variant="primary" disabled />
          </div>
          <div className={styles.toggleItem}>
            <label>비활성화 + 켜짐:</label>
            <Toggle variant="primary" checked disabled />
          </div>
        </div>
      </section>
    </div>
  );
}

