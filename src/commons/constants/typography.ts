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

export interface TypographyToken {
  fontSize: FontSizeToken;
  fontWeight: FontWeightToken;
  lineHeight: LineHeightToken;
  letterSpacing: LetterSpacingToken;
}

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

export interface DeviceTypography {
  mobile: TypographyToken;
  desktop: TypographyToken;
}

export interface TypographyTheme {
  korean: DeviceTypography;
  english: DeviceTypography;
}

export const mobileKorean: TypographyToken = {
  ...koreanTypography,
  fontSize: {
    ...koreanTypography.fontSize,
    xl: '1.125rem',    // 18px (더 작게)
    '2xl': '1.375rem', // 22px (더 작게)
    '3xl': '1.75rem',  // 28px (더 작게)
    '4xl': '2rem',     // 32px (더 작게)
    '5xl': '2.5rem',   // 40px (더 작게)
  },
};

export const mobileEnglish: TypographyToken = {
  ...englishTypography,
  fontSize: {
    ...englishTypography.fontSize,
    xl: '1.125rem',    // 18px (더 작게)
    '2xl': '1.375rem', // 22px (더 작게)
    '3xl': '1.75rem',  // 28px (더 작게)
    '4xl': '2rem',     // 32px (더 작게)
    '5xl': '2.5rem',   // 40px (더 작게)
  },
};

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

export default typography;

