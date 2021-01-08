import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Menu from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginLeft: '-4px'
  },
  notificationsButton: {
    marginLeft: 'auto'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

interface TopbarProps {
  className: string;
  toggleSideBar: any;
}

type Props = RouteComponentProps & TopbarProps;

const Topbar: React.FC<Props> = ({ className, toggleSideBar, history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const popoverOpen = Boolean(anchorEl);

  return (
    <>
      <div className={clsx(classes.root, className)}>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.menuButton} onClick={toggleSideBar}>
            <Menu />
          </IconButton>

          {/* <IconButton className={classes.notificationsButton} onClick={handlePopoverClick}>
            <AccountCircle />
          </IconButton> */}

          <Popover
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            open={popoverOpen}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <List>
              <Link to='/settings' style={{ textDecoration: 'none' }}>
                <ListItem button key='Settings' onClick={handlePopoverClose}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary='Settings' />
                </ListItem>
              </Link>
              <ListItem
                button
                onClick={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                }}
                // Force the rendering of a link
                // ref: https://github.com/mui-org/material-ui/issues/11161
                component='a'
                href='/users/sign_out'
              >
                <ListItemIcon>
                  <ArrowForwardIos />
                </ListItemIcon>
                <ListItemText primary='Log out' />
              </ListItem>
            </List>
          </Popover>
        </Toolbar>
      </div>
    </>
  );
};

export default withRouter(Topbar);
