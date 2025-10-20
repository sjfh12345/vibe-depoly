interface ColorToken {
  '05': string;
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70'?: string;
  '80'?: string;
  '90'?: string;
}

interface GrayToken {
  white: string;
  '05': string;
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '80': string;
  '90': string;
  black: string;
}

interface CoolGrayToken {
  '01': string;
  '05': string;
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
}

interface GradientToken {
  primary: string;
  skeleton: string;
}

export const blue: ColorToken = {
  '05': '#F0F7FF',
  '10': '#DBEEFF',
  '20': '#BDDBFF',
  '30': '#93BEFF',
  '40': '#6DA5FA',
  '50': '#497CFF',
  '60': '#3A5CF3',
  '70': '#274AE1',
  '80': '#1530A6',
  '90': '#0B2184',
};

export const gray: GrayToken = {
  white: '#FFFFFF',
  '05': '#F2F2F2',
  '10': '#E4E4E4',
  '20': '#D4D3D3',
  '30': '#C7C7C7',
  '40': '#ABABAB',
  '50': '#919191',
  '60': '#777777',
  '70': '#5F5F5F',
  '80': '#333333',
  '90': '#1C1C1C',
  black: '#000000',
};

export const red: ColorToken = {
  '05': '#FDD7DC',
  '10': '#F797A4',
  '20': '#F4677A',
  '30': '#F03851',
  '40': '#E4112E',
  '50': '#B40E24',
  '60': '#850A1B',
};

export const green: ColorToken = {
  '05': '#D3F3E0',
  '10': '#92E6B9',
  '20': '#15D66F',
  '30': '#12B75F',
  '40': '#109C51',
  '50': '#0E723C',
  '60': '#084424',
};

export const yellow: ColorToken = {
  '05': '#FFE499',
  '10': '#FFD666',
  '20': '#FFC933',
  '30': '#FFB300',
  '40': '#EBA500',
  '50': '#D69600',
  '60': '#B27D00',
};

export const coolGray: CoolGrayToken = {
  '01': '#F8F8FA',
  '05': '#F6F6F9',
  '10': '#EDEEF2',
  '20': '#DDDFE5',
  '30': '#D2D4DD',
  '40': '#C7C9D5',
  '50': '#BBBECD',
  '60': '#B0B3C4',
};

export const gradient: GradientToken = {
  primary: 'linear-gradient(45deg, #6DA5FA 0%, #92EAF5 100%)',
  skeleton: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 48.5%, rgba(255,255,255,0) 100%)',
};

export interface SemanticToken {
  error: string;
  success: string;
  primary: string;
  warning: string;
}

export const semantic: SemanticToken = {
  error: red['30'],
  success: green['30'],
  primary: blue['60'],
  warning: yellow['30'],
};

export interface Theme {
  background: string;
  foreground: string;
  blue: ColorToken;
  gray: GrayToken;
  red: ColorToken;
  green: ColorToken;
  yellow: ColorToken;
  coolGray: CoolGrayToken;
  gradient: GradientToken;
  semantic: SemanticToken;
}

export const light: Theme = {
  background: gray.white,
  foreground: gray.black,
  blue,
  gray,
  red,
  green,
  yellow,
  coolGray,
  gradient,
  semantic,
};

export const darkSemantic: SemanticToken = {
  error: red['20'],
  success: green['20'],
  primary: blue['40'],
  warning: yellow['20'],
};

export const darkGradient: GradientToken = {
  primary: gradient.primary,
  skeleton: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.2) 48.5%, rgba(0,0,0,0) 100%)',
};

export const dark: Theme = {
  background: gray['90'],
  foreground: gray.white,
  blue,
  gray,
  red,
  green,
  yellow,
  coolGray,
  gradient: darkGradient,
  semantic: darkSemantic,
};

export interface Colors {
  light: Theme;
  dark: Theme;
}

const colors: Colors = {
  light,
  dark,
};

export default colors;
