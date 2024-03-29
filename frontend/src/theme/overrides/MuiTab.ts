// Palette
import palette from '../palette';

export default {
  root: {
    height: '50px',
    fontWeight: 400,
    textTransform: 'none' as const,
    fontSize: '14px',
    '@media (min-width: 960px)': {
      minWidth: '100px'
    },
    '&$selected': {
      fontWeight: 500
    }
  },
  textColorPrimary: {
    color: palette.text.secondary
  }
};
