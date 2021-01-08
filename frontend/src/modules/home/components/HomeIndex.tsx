import { Box, Card, Grid, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BACKEND_URL } from 'src/constants';
import DefaultPage from 'src/modules/home/components/DefaultPage';
import * as session from 'src/modules/session';

type Props = RouteComponentProps;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `40px 40px 40px 40px`
  },
  buttons: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const HomeIndex: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useSelector(session.selectors.getCurrentUser);
  const classes = useStyles();

  return user ? (
    <Card className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <img src={BACKEND_URL + user!.profile!.substr(1)} alt='' width='60' height='60' />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id='username'
            label='Username'
            defaultValue={user!.name}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id='nickname'
            label='Nickname'
            defaultValue={user!.nickname}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
      </Grid>
    </Card>
  ) : (
    <DefaultPage />
  );
};

export default withRouter(HomeIndex);
