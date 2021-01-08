import * as colors from '@material-ui/core/colors';

import { black, blue, green, white } from './colors';

const palette = {
  common: {
    white,
    black,
    neutral: '#E4E7EB'
  },
  primary: {
    contrastText: white,
    main: '#ffa31a',
    light: '#F6F9FD',
    dark: '#1b1b1b'
  },
  secondary: {
    contrastText: white,
    main: '#7d58ff',
    light: '',
    dark: '#37248F'
  },
  error: {
    contrastText: white,
    main: '#FF5263',
    light: '#ffedef',
    dark: ''
  },
  success: {
    contrastText: white,
    main: '#45B880',
    light: '#F1FAF5',
    dark: '#00783E'
  },
  info: {
    contrastText: white,
    main: '#1070CA',
    light: '#F1FBFC',
    dark: '#007489'
  },
  warning: {
    contrastText: white,
    main: '#E69F22',
    light: '#FDF8F3',
    dark: '#95591E'
  },
  danger: {
    contrastText: white,
    main: '#ED4740',
    light: '#FEF6F6',
    dark: '#BF0E08'
  },
  discarded: {
    contrastText: black,
    main: colors.red['200'],
    light: colors.red['100'],
    dark: colors.red['300']
  },
  text: {
    primary: '#12161B',
    secondary: '#66788A',
    disabled: '#A6B1BB'
  },
  background: {
    paper: white,
    default: '#f8fafc'
  },
  divider: '#DFE3E8'
};

export default palette;
