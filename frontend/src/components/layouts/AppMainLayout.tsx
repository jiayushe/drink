import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

const useStyles = makeStyles<any>((theme) => ({
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: '271px',
    width: 'calc(-271px + 100vw)'
  },
  drawerPaper: {
    zIndex: 7,
    width: '271px'
  },
  sidebar: {
    width: '270px'
  },
  content: {
    marginTop: '64px',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: '270px'
  }
}));

type Props = RouteComponentProps;

const AppMainLayout: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(!isMobile);
  const shiftTopbar = isDrawerOpen && !isMobile;
  const shiftContent = isDrawerOpen && !isMobile;

  return (
    <>
      <Topbar
        className={clsx(classes.topbar, {
          [classes.topbarShift]: shiftTopbar
        })}
        toggleSideBar={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <Drawer
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        variant={isMobile ? 'temporary' : 'persistent'}
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: shiftContent
        })}
      >
        {props.children}
      </main>
    </>
  );
};

export default withRouter(AppMainLayout);
