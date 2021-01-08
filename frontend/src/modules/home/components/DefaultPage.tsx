import { Button, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  content: {
    margin: '0 auto',
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
}));

type Props = RouteComponentProps;

const DefaultPage: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  return (
    <Card className={classes.content}>
      <Grid container direction='column' justify='center' spacing={3}>
        <Grid item>
          <Typography variant='h4' color='inherit' style={{ height: 40 }}>
            APPNAME
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Welcome to APPNAME! Get started with a test or sign in to view your past records!</Typography>
        </Grid>
        <Grid item>
          <Grid container direction='row' justify='center' spacing={3}>
            <Grid item>
              <Button onClick={() => history.push('/test')} variant='contained' color='primary'>
                Take a Test
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => history.push('/signin')} variant='contained' color='primary'>
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withRouter(DefaultPage);
