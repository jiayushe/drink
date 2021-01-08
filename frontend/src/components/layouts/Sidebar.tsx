import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Logout from '@material-ui/icons/ExitToApp';
import User from '@material-ui/icons/SupervisedUserCircle';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, NavLinkProps, RouteComponentProps, withRouter } from 'react-router-dom';

import { operations } from 'src/modules/session';
import { handleApiRequest } from 'src/utils/ui';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63px',
    flexShrink: 0
  },
  logoLink: {
    fontSize: 0
  },
  logoImage: {
    cursor: 'pointer'
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profileDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

interface SideButtonProps {
  url: string;
  text: string;
  icon: React.ReactElement;
  nested?: boolean;
  badge?: number;
}

const SideButton: React.FC<SideButtonProps> = ({ url, text, icon, nested, badge }) => {
  const classes = useStyles();
  const [displayBadge, setDisplayBadge] = React.useState(true);
  const RefNavLink = React.forwardRef((refProps: Readonly<NavLinkProps>, refTarget) => <NavLink {...refProps} />);

  return (
    <ListItem
      activeClassName={classes.activeListItem}
      className={nested ? clsx(classes.listItem, classes.nested) : classes.listItem}
      component={RefNavLink}
      to={url}
      onClick={() => setDisplayBadge(false)}
    >
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

interface SidebarProps {
  className: string;
}

type Props = RouteComponentProps & SidebarProps;

const Sidebar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    handleApiRequest(dispatch, dispatch(operations.signOut())).then(() => {
      props.history.push('/login');
    });
  };

  return (
    <nav className={clsx(classes.root, props.className)}>
      {/* <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to='/'>
          <img alt='icon' className={classes.logoImage} src='/icon.png' />
        </Link>
      </div> */}

      <Divider className={classes.logoDivider} />

      <List component='div' disablePadding>
        <SideButton url='/' text='Home' icon={<Home />} />
        <SideButton url='/user' text='Update Profile' icon={<User />} />
        <Divider />
        <ListItem
          className={classes.listItem}
          onClick={(e: React.ChangeEvent<any>) => {
            e.preventDefault();
            handleSignOut();
          }}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={'Sign out'} />
        </ListItem>
      </List>
    </nav>
  );
};

export default withRouter(Sidebar);
