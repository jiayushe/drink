import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Card, Grid, TextField, makeStyles } from '@material-ui/core';
import * as Yup from 'yup';

import SimpleForm, { FormMetadataType } from 'src/components/SimpleForm';
import DefaultPage from 'src/modules/home/components/DefaultPage';
import { UserData } from 'src/types/user';
import { handleApiRequest } from 'src/utils/ui';
import { updateUser } from '../operations';
import { getCurrentUser } from '../selectors';

type Props = RouteComponentProps;

const UpdateUserPage: React.FC<Props> = ({ history }) => {
  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const values: Partial<UserData> = {
    name: user && user.name ? user.name : '',
    nickname: user && user.nickname ? user.nickname : '',
    file_helper: ''
  };

  const formMetadata: FormMetadataType<UserData> = {
    nickname: { label: 'Nickname', required: true, options: null, xs: 12, sm: 12 }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    nickname: Yup.string().required('Nickname is required'),
    file_helper: Yup.string().required()
  });

  return user ? (
    <SimpleForm
      initialValues={values}
      formMetadata={formMetadata}
      validationSchema={validationSchema}
      onCancel={() => history.push('/users')}
      onSubmit={(newValues: UserData) => {
        return handleApiRequest(dispatch, dispatch(updateUser(newValues))).then(() => {
          history.push('/');
          return false;
        });
      }}
    />
  ) : (
    <DefaultPage />
  );
};

export default withRouter(UpdateUserPage);
