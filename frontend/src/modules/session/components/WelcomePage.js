import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        var hydration = "hello there";
        if (brightness >= 210){
            hydration = "Well Hydrated, Drink water as per normal!"
        } else if (brightness > 170) {
            hydration = "You're doing fine, maybe drink a small cup of water!"
        } else if (brightness > 150) {
            hydration = "Drink 1/4 litre in the next hour!"
        } else if (brightness > 120) {
            hydration = "Drink 1/4 litre right now!"
        } else {
            hydration = "Drink 1 litre right now!"
        }

        callback(hydration);
    }
}

class WelcomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '', hydrationText: ''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      getImageLightness(this.state.imagePreviewUrl, (h) => this.setState({hydrationText: h}));
    //   getImageLightness(this.state.imagePreviewUrl, (h) => console.log(h));
    // console.log(this.state.hydrationText);
    //   getImageLightness(console.log);
    
    //   console.log('handle uploading-', this.state);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} style={{width: "400px", maxHeight: '400px'}}/>);
      } else {
        $imagePreview = (
        <div style={{height:'200px', width:'400px', backgroundColor:'#e5707e', justifyContent:'center', paddingTop:'100px', color:'#e8e9a1'}}>
            <Typography align="center" style={{fontSize:"40px"}}>Pick your WeeWee Picture</Typography>
        </div>);
      }
  
      return (
          
        <div style={{width:'100%', height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center', borderRight:'4px solid',borderColor:'#e5707e' , backgroundColor:'#a3ddcb'}}>
        <div style={{position:'absolute', marginBottom:'700px', fontSize:"40px", fontWeight:'bold'}}>WELCOME SIRE</div>
        <div className="previewComponent" style={{justifyContent:'center', alignItems:'center'}}>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
              <label htmlFor="imagepicker">
                <div align="center" style={{backgroundColor:'#e8e9a1',color:'#e5707e', width:"400px", alignContent:'center', height:'60px',borderRadius:"10px 10px 0px 0px"}}>
                    <Typography align='center' style={{fontSize:'30px', paddingTop:'10px'}}>BROWSE IMAGES</Typography>
                </div>
              </label>
              <input
                    type="file"
                    id="imagepicker"
                    style={{display: 'none'}}
                    onChange={(e)=>this._handleImageChange(e)} />
                <div className="imgPreview" >
                    {$imagePreview}
                </div>
                <Button className="submitButton" 
                    variant="contained"
                    disableElevation
                    onClick={(e)=>this._handleSubmit(e)}
                    style={{fontSize: '30px', backgroundColor:'#e8e9a1', color:'#e5707e', position:'relative', width:'400px', borderRadius:"0px 0px 10px 10px", marginTop:'-5px'}}
                >
                    Did I drink enough?
                </Button>
          </form>
          <div style={{maxWidth:'400px'}}>
            <Typography align="center" style={{fontSize: '40px'}}>{this.state.hydrationText}</Typography>
          </div>
        </div>
        </div>
      )
    }
}

export default WelcomePage;

