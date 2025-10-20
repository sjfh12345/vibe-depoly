import { red, blue, gray, yellow, green } from './color';

export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

export interface EmotionInfo {
  label: string;
  images: {
    medium: string;
    small: string;
  };
  icons: {
    medium: string;
  };
  color: string;
}

export const EMOTION_INFO: Record<EmotionType, EmotionInfo> = {
  [EmotionType.HAPPY]: {
    label: '행복해요',
    images: {
      medium: '/images/emotion-happy-m.png',
      small: '/images/emotion-happy-s.png',
    },
    icons: {
      medium: '/icons/emotion-happy-m.svg',
    },
    color: red['60'],
  },
  [EmotionType.SAD]: {
    label: '슬퍼요',
    images: {
      medium: '/images/emotion-sad-m.png',
      small: '/images/emotion-sad-s.png',
    },
    icons: {
      medium: '/icons/emotion-sad-m.svg',
    },
    color: blue['60'],
  },
  [EmotionType.ANGRY]: {
    label: '화나요',
    images: {
      medium: '/images/emotion-angry-m.png',
      small: '/images/emotion-angry-s.png',
    },
    icons: {
      medium: '/icons/emotion-angry-m.svg',
    },
    color: gray['60'],
  },
  [EmotionType.SURPRISE]: {
    label: '놀랐어요',
    images: {
      medium: '/images/emotion-surprise-m.png',
      small: '/images/emotion-surprise-s.png',
    },
    icons: {
      medium: '/icons/emotion-surprise-m.svg',
    },
    color: yellow['60'],
  },
  [EmotionType.ETC]: {
    label: '기타',
    images: {
      medium: '/images/emotion-etc-m.png',
      small: '/images/emotion-etc-s.png',
    },
    icons: {
      medium: '/icons/emotion-etc-m.svg',
    },
    color: green['60'],
  },
};

export const getEmotionInfo = (type: EmotionType): EmotionInfo => {
  return EMOTION_INFO[type];
};

export const getEmotionLabel = (type: EmotionType): string => {
  return EMOTION_INFO[type].label;
};

export const getEmotionColor = (type: EmotionType): string => {
  return EMOTION_INFO[type].color;
};

export const getEmotionImage = (type: EmotionType, size: 'medium' | 'small'): string => {
  return EMOTION_INFO[type].images[size];
};

export const getEmotionIcon = (type: EmotionType, size: 'medium' = 'medium'): string => {
  return EMOTION_INFO[type].icons[size];
};

export const getAllEmotionTypes = (): EmotionType[] => {
  return Object.values(EmotionType);
};
