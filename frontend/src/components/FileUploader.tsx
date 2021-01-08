import { Button, Chip, Divider, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Property } from 'csstype';
import { Field, FieldProps } from 'formik';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    link: {
      'color': theme.palette.primary.main,
      'textDecoration': 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    chipsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    heading: {
      paddingLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.primary.dark
    }
  })
);

// Dropzone styling
const dropZoneStyle = {
  baseStyle: {
    flex: 1,
    display: 'flex',
    height: '20vh',
    flexDirection: 'column' as Property.FlexDirection,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  },

  activeStyle: {
    borderColor: '#2196f3'
  },

  acceptStyle: {
    borderColor: '#00e676'
  },

  rejectStyle: {
    borderColor: '#ff1744'
  }
};

interface OwnProps {
  fieldname: string;
  fieldnameHelper: string;
  title?: string;
}

const FileUploader: React.FC<OwnProps> = (props) => {
  const { fieldname, fieldnameHelper, title } = props;
  const [localFile, setLocalFile] = React.useState<File>();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, isFocused } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => {
      rejectedFiles.forEach((rejectedFile) => {
        enqueueSnackbar(
          `File: ${rejectedFile.name} is rejected
          Please check your file type and/or the size has exceeded 10MB`,
          {
            variant: 'error',
            autoHideDuration: 7000,
            style: { whiteSpace: 'pre-line' }
          }
        );
      });
      setLocalFile(acceptedFiles[0]);
    },
    maxSize: 10485760,
    accept: 'image/jpeg, image/png'
  });

  const style = React.useMemo(
    () => ({
      ...dropZoneStyle.baseStyle,
      ...(isDragActive ? dropZoneStyle.activeStyle : {}),
      ...(isDragAccept ? dropZoneStyle.acceptStyle : {}),
      ...(isDragReject ? dropZoneStyle.rejectStyle : {}),
      ...(isFocused ? dropZoneStyle.activeStyle : {})
    }),
    [isDragActive, isDragAccept, isDragReject, isFocused]
  );

  return (
    <Field
      name={`${fieldname}`}
      render={({ field, form }: FieldProps) => (
        <>
          {title && (
            <>
              <Grid container alignItems='center' justify='space-between'>
                <Grid item className={classes.heading} xs={12} sm={3}>
                  <Typography variant='h6'>{title}</Typography>
                </Grid>
              </Grid>
              <Divider />
            </>
          )}
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files (File size limit: 10MB)</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
          {localFile && (
            <Grid container alignItems='center' justify='space-between'>
              <Grid item sm={8}>
                <aside className={classes.chipsContainer}>
                  <Chip
                    title={localFile.name}
                    label={localFile.name}
                    onDelete={() => {
                      setLocalFile(undefined);
                      form.setFieldValue(`${fieldnameHelper}`, null);
                    }}
                    className={classes.chip}
                    variant='outlined'
                    color='primary'
                    classes={{
                      label: classes.link
                    }}
                  />
                </aside>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  disabled={!localFile || field.value === localFile || form.isSubmitting}
                  onClick={() => {
                    form.setFieldValue(`${fieldname}`, localFile);
                    form.setFieldValue(`${fieldnameHelper}`, 'yes');
                  }}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    />
  );
};

export default FileUploader;
