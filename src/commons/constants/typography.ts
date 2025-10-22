interface FontSizeToken {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  // 추가 사이즈
  '6xl': string;
  '7xl': string;
  '8xl': string;
}

interface FontWeightToken {
  thin: number;
  light: number;
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

interface LineHeightToken {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

interface LetterSpacingToken {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

/**
 * 웹 타이포그래피 토큰 인터페이스
 */
export interface TypographyToken {
  fontSize: FontSizeToken;
  fontWeight: FontWeightToken;
  lineHeight: LineHeightToken;
  letterSpacing: LetterSpacingToken;
}

/**
 * 한글 데스크톱 타이포그래피 토큰
 */
export const koreanTypography: TypographyToken = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
  },
  fontWeight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

/**
 * 영문 데스크톱 타이포그래피 토큰
 * 피그마에서 확인한 SUIT 폰트 기반
 */
export const englishTypography: TypographyToken = {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
  },
  fontWeight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.2,
    snug: 1.35,
    normal: 1.45,
    relaxed: 1.6,
    loose: 1.9,
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.08em',
  },
};

/**
 * 한글 모바일 타이포그래피 토큰
 */
export const mobileKorean: TypographyToken = {
  ...koreanTypography,
  fontSize: {
    ...koreanTypography.fontSize,
    xl: '1.125rem',    // 18px (데스크톱보다 작게)
    '2xl': '1.375rem', // 22px (데스크톱보다 작게)
    '3xl': '1.75rem',  // 28px (데스크톱보다 작게)
    '4xl': '2rem',     // 32px (데스크톱보다 작게)
    '5xl': '2.5rem',   // 40px (데스크톱보다 작게)
  },
};

/**
 * 영문 모바일 타이포그래피 토큰
 */
export const mobileEnglish: TypographyToken = {
  ...englishTypography,
  fontSize: {
    ...englishTypography.fontSize,
    xl: '1.125rem',    // 18px (데스크톱보다 작게)
    '2xl': '1.375rem', // 22px (데스크톱보다 작게)
    '3xl': '1.75rem',  // 28px (데스크톱보다 작게)
    '4xl': '2rem',     // 32px (데스크톱보다 작게)
    '5xl': '2.5rem',   // 40px (데스크톱보다 작게)
  },
};

/**
 * 디바이스별 타이포그래피 인터페이스
 */
export interface DeviceTypography {
  mobile: TypographyToken;
  desktop: TypographyToken;
}

/**
 * 언어별, 디바이스별 타이포그래피 테마 인터페이스
 */
export interface TypographyTheme {
  korean: DeviceTypography;
  english: DeviceTypography;
}

/**
 * 전체 타이포그래피 테마 설정
 */
export const typography: TypographyTheme = {
  korean: {
    desktop: koreanTypography,
    mobile: mobileKorean,
  },
  english: {
    desktop: englishTypography,
    mobile: mobileEnglish,
  },
};

/**
 * 웹 헤드라인 스타일 객체 (피그마 디자인 시스템 기반)
 */
export const webHeadlineStyles = {
  headline01: {
    fontWeight: 'semibold',
    fontSize: '3rem', // 48px
    lineHeight: '3.75rem', // 60px
  },
  headline02: {
    fontWeight: 'semibold',
    fontSize: '2.25rem', // 36px
    lineHeight: '3rem', // 48px
  },
  headline03: {
    fontWeight: 'semibold',
    fontSize: '1.75rem', // 28px
    lineHeight: '2.25rem', // 36px
  },
};

/**
 * 헤드라인 스타일 객체 (피그마 디자인 시스템 기반)
 */
export const headlineStyles = {
  headline01: {
    fontWeight: 'bold',
    fontSize: '1.5rem', // 24px
    lineHeight: '2rem', // 32px
  },
  headline02: {
    fontWeight: 'extrabold',
    fontSize: '1.375rem', // 22px
    lineHeight: '1.875rem', // 30px
  },
  headline03: {
    fontWeight: 'bold',
    fontSize: '1.25rem', // 20px
    lineHeight: '1.75rem', // 28px
  },
};

/**
 * 타이틀 스타일 객체 (피그마 디자인 시스템 기반)
 */
export const titleStyles = {
  title01: {
    fontWeight: 'bold',
    fontSize: '1.125rem', // 18px
    lineHeight: '1.5rem', // 24px
  },
  title02: {
    fontWeight: 'bold',
    fontSize: '1rem', // 16px
    lineHeight: '1.375rem', // 22px
  },
  title03: {
    fontWeight: 'bold',
    fontSize: '0.875rem', // 14px
    lineHeight: '1.25rem', // 20px
  },
  subtitle01: {
    fontWeight: 'semibold',
    fontSize: '0.875rem', // 14px
    lineHeight: '1.375rem', // 22px
  },
  subtitle02: {
    fontWeight: 'semibold',
    fontSize: '0.75rem', // 12px
    lineHeight: '1.125rem', // 18px
  },
};

/**
 * 본문 스타일 객체 (피그마 디자인 시스템 기반)
 */
export const bodyStyles = {
  body01: {
    fontWeight: 'medium',
    fontSize: '1rem', // 16px
    lineHeight: '1.5rem', // 24px
  },
  body02_m: {
    fontWeight: 'medium',
    fontSize: '0.875rem', // 14px
    lineHeight: '1.375rem', // 22px
  },
  body03: {
    fontWeight: 'medium',
    fontSize: '0.75rem', // 12px
    lineHeight: '1.125rem', // 18px
  },
  body01_regular: {
    fontWeight: 'regular',
    fontSize: '1rem', // 16px
    lineHeight: '1.375rem', // 22px
  },
  body02_s: {
    fontWeight: 'regular',
    fontSize: '0.875rem', // 14px
    lineHeight: '1.25rem', // 20px
  },
  body03_regular: {
    fontWeight: 'regular',
    fontSize: '0.75rem', // 12px
    lineHeight: '1rem', // 16px
  },
};

/**
 * 캡션 스타일 객체 (피그마 디자인 시스템 기반)
 */
export const captionStyles = {
  caption01: {
    fontWeight: 'semibold',
    fontSize: '0.75rem', // 12px
    lineHeight: '0.875rem', // 14px
  },
  caption02_m: {
    fontWeight: 'semibold',
    fontSize: '0.625rem', // 10px
    lineHeight: '0.75rem', // 12px
  },
  caption02_s: {
    fontWeight: 'medium',
    fontSize: '0.625rem', // 10px
    lineHeight: '0.75rem', // 12px
  },
  caption03: {
    fontWeight: 'semibold',
    fontSize: '0.5rem', // 8px
    lineHeight: '0.625rem', // 10px
  },
};

export default typography;