import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import { Button, Card, Divider, Grid, Step, Stepper, StepLabel, Typography, makeStyles } from '@material-ui/core';
import 'react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles(() => ({
  content: {
    margin: '0 auto',
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%'
  }
}));

const pixelRatio = window.devicePixelRatio || 1;

type Props = RouteComponentProps;

const TestPage: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const [rawImage, setRawImage] = React.useState('');
  const [crop, setCrop] = React.useState({ unit: '%', width: 30, height: 30 } as ReactCrop.Crop);
  const [completedCrop, setCompletedCrop] = React.useState({} as ReactCrop.Crop);
  const imageRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [brightness, setBrightness] = React.useState(0);

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setRawImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = React.useCallback((img: any) => {
    imageRef.current = img;
  }, []);

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
      return;
    }

    const image = imageRef.current! as any;
    const canvas = previewCanvasRef.current! as any;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width! * pixelRatio;
    canvas.height = crop.height! * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let colorSum = 0;
    for (let x = 0, len = data.length; x < len; x += 4) {
      colorSum += Math.floor((data[x] + data[x + 1] + data[x + 2]) / 3);
    }
    setBrightness(Math.floor(colorSum / (canvas.width * canvas.height)));
  }, [completedCrop]);

  const steps = ['Upload Image', 'Crop Image', 'See Your Results'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Card className={classes.content}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep == 0 && (
        <Grid>
          <input type='file' accept='image/*' onChange={onSelectFile} />
        </Grid>
      )}
      {activeStep == 1 && (
        <Grid>
          <ReactCrop
            src={rawImage}
            onImageLoaded={onLoad}
            minHeight={1}
            minWidth={1}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <canvas
            ref={previewCanvasRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0)
            }}
          />
        </Grid>
      )}
      {activeStep == 2 && (
        <Grid>
          <Typography>
            {brightness >= 210
              ? 'Well Hydrated, Drink water as per normal!'
              : brightness >= 170
              ? "You're doing fine, maybe drink a small cup of water!"
              : brightness >= 150
              ? 'Drink 1/4 litre in the next hour!'
              : brightness >= 120
              ? 'Drink 1/4 litre right now!'
              : 'Drink 1 litre right now!'}
          </Typography>
        </Grid>
      )}
      <br />
      <Divider />
      <br />
      <Grid container direction='row' justify='center' spacing={3}>
        <Grid item>
          <Button variant='contained' color='primary' disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' disabled={activeStep === steps.length - 1} onClick={handleNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withRouter(TestPage);
