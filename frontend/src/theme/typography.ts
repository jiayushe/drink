import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import palette from './palette';

const typographyOptions: TypographyOptions = {
  fontFamily: ['East Sea Dokdo'].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '45px',
    letterSpacing: '-0.24px',
    lineHeight: '50px'
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '39px',
    letterSpacing: '-0.24px',
    lineHeight: '42px'
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '34px',
    letterSpacing: '-0.06px',
    lineHeight: '38px'
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '30px',
    letterSpacing: '-0.06px',
    lineHeight: '34px'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '28px',
    letterSpacing: '-0.05px',
    lineHeight: '30px'
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '26px',
    letterSpacing: '-0.05px',
    lineHeight: '30px'
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '26px',
    letterSpacing: '-0.05px',
    lineHeight: '35px'
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: '24px',
    letterSpacing: 0,
    lineHeight: '26px'
  },
  body1: {
    color: palette.text.primary,
    fontSize: '26px',
    letterSpacing: '-0.05px',
    lineHeight: 'normal'
  },
  body2: {
    color: palette.text.primary,
    fontSize: '24px',
    letterSpacing: '-0.04px',
    lineHeight: 'normal'
  },
  button: {
    color: palette.text.primary,
    fontSize: '24px'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '24px',
    letterSpacing: '0.3px',
    lineHeight: 'normal'
  }
};

export default typographyOptions;
