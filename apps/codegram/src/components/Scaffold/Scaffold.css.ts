import {createTheme, style} from '@vanilla-extract/css';

export const [scaffoldTheme, scaffoldVars] = createTheme({
  toolbarHeight: '60px',
  panelWidth: '280px',
});

export const scaffold = style([
  scaffoldTheme,
  {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    display: 'flex',
  },
]);
