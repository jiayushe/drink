import { Button, Card, CardContent, Grid, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SimpleForm, { FormMetadataType } from 'src/components/SimpleForm';
import { UserData } from 'src/types/user';
import { handleApiRequest } from 'src/utils/ui';
import * as Yup from 'yup';

import { createUser } from '../operations';

const useStyles = makeStyles(() => ({
  content: {
    margin: '0 auto',
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
}));

type Props = RouteComponentProps;

const NewUserPage: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const values: Partial<UserData> = {
    name: '',
    nickname: '',
    password: '',
    file_helper: ''
  };

  const formMetadata: FormMetadataType<UserData> = {
    name: { label: 'Username', required: true, options: null, xs: 12, sm: 12 },
    password: { label: 'Password', required: true, options: null, xs: 12, sm: 12 },
    nickname: { label: 'Nickname', required: true, options: null, xs: 12, sm: 12 }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    nickname: Yup.string().required('Nickname is required'),
    file_helper: Yup.string().required()
  });

  return (
    <Card className={classes.content}>
      <CardContent>
        <Grid container direction='column' justify='center' spacing={3}>
          <Grid item>
            <Typography variant='h4' color='inherit' style={{ height: 40 }}>
              DRINK
            </Typography>
            <Typography variant='h5'>Sign Up</Typography>
          </Grid>
          <Grid item xs>
            <SimpleForm
              initialValues={values}
              formMetadata={formMetadata}
              validationSchema={validationSchema}
              onCancel={() => history.push('/users')}
              onSubmit={(newValues: UserData) => {
                return handleApiRequest(dispatch, dispatch(createUser(newValues))).then(() => {
                  history.push('/');
                  return false;
                });
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withRouter(NewUserPage);
