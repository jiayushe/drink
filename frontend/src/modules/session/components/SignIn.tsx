import { Button, Card, CardContent, Grid, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  content: {
    margin: '0 auto',
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
}));

interface OwnProps {
  error: boolean;
  errorMessage: string;
  noticeMessage: string;
  handleSignin: (username: string, password: string) => any;
}

const SignIn: React.FC<OwnProps> = (props) => {
  const classes = useStyles();

  const usernameField = React.useRef<HTMLInputElement | null>(null);
  const passwordField = React.useRef<HTMLInputElement | null>(null);

  const handleEnter = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.handleSignin(usernameField.current!.value, passwordField.current!.value);
    }
  };

  return (
    <Card className={classes.content}>
      <CardContent>
        <Grid container direction='column' justify='center' spacing={3}>
          <Grid item>
            <Typography variant='h4' color='inherit' style={{ height: 40 }}>
              APPNAME
            </Typography>
            <Typography variant='h5'>Sign In</Typography>
          </Grid>
          <Grid item xs>
            <Grid container direction='row' justify='center'>
              <Grid item xs={10}>
                <Grid container direction='column' spacing={2} alignItems='stretch'>
                  <Grid item xs>
                    <Grid container direction='column' spacing={2} alignItems='stretch'>
                      <Grid item xs>
                        <Typography variant='body2' color='textSecondary' align='left'>
                          {props.noticeMessage}
                        </Typography>
                      </Grid>

                      <Grid item xs>
                        <Grid container direction='column' alignItems='flex-start'>
                          <Grid item xs>
                            <Typography variant='body2' color='error'>
                              {props.errorMessage}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs>
                        <Grid container direction='column' alignItems='stretch'>
                          <TextField
                            autoFocus
                            inputRef={usernameField}
                            error={props.error}
                            id='username'
                            name='user[username]'
                            label='Username'
                            onKeyPress={handleEnter}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs>
                        <Grid container direction='column' alignItems='stretch'>
                          <TextField
                            inputRef={passwordField}
                            type='password'
                            error={props.error}
                            id='password'
                            name='user[password]'
                            label='Password'
                            onKeyPress={handleEnter}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs>
                        <Grid container direction='column' alignItems='flex-end'>
                          <Grid item xs>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                props.handleSignin(usernameField.current!.value, passwordField.current!.value);
                              }}
                              variant='contained'
                              color='primary'
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction='column' alignItems='flex-end'>
                      <Link component={RouterLink} to='/signup'>
                        Sign up
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SignIn;
