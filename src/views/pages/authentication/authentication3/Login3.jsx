import React, { useState } from 'react';

import { 
  TextField, 
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select 
} from '@mui/material';
import { useFetcher, API } from 'api';
import { toast } from 'react-hot-toast';

const Login3 = () => {
    const [xStartCoordinatesField1, setXStartCoordinatesField1] = useState(null);
    const [yStartCoordinatesField1, setYStartCoordinatesField1] = useState(null);
    const [width1, setWidth1] = useState(null)
    const [base64String, setBase64String] = useState('');
    const [currentClick, setCurrentClick] = useState(1);
    const { data } = useFetcher('https://ier-prod.galaxygroup.biz/certificates/certificate-types')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentCertificateType, setCurrentCertificateType] = useState(null)
    const [newMenuStyle, setnewMenuStyle] = useState({top: '10px', right: '10px'})
    const [selectedField, setSelectedField] = useState(null)
    const [certificateTypeId, setCertificateTypeId] = useState(null)
    const [submittedData, setSubmittedData] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64 = event.target.result;
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };
    const imageTypeWithPrefix = base64String?.split(';')[0]?.split(':')[1];
    const imageType = imageTypeWithPrefix?.split('/')[1];
    const imageData = base64String?.split(',')[1];   

    const handleSubmit = async() => {
      const formattedParams = Object.values(submittedData).map((fieldData) => ({
        ...fieldData,
      }));
        await toast.promise(
        API.post(`https://ier-prod.galaxygroup.biz/certificates/templates`, {
            typeId: certificateTypeId,
            file: {
              fileText: imageData,
              type: "image",
              name: `${currentCertificateType?.name}.${imageType}`,
              membershipType: currentCertificateType?.name,
            },
            params: formattedParams,
          }),
          {
              loading: `Creating templaye, please wait...`,
              success: `Template created Successfully!`,
              error: `There was an error creating this template!`
          },
          { position: 'top-center' }
      );
    }

    function calculateWidth(x1, y1, x2, y2) {
        return Math.abs(x2 - x1);
      }
    
      function handleImageDoubleClick(event) {
        const imageWrapperRect = event.currentTarget.getBoundingClientRect();
        const relativeX = event.clientX - imageWrapperRect.left;
        const relativeY = event.clientY - imageWrapperRect.top;
        if (currentClick === 1) {
          setXStartCoordinatesField1(relativeX);
          setYStartCoordinatesField1(relativeY);
          setCurrentClick(2);
      
          const updatedParam = {
            paramName: selectedField,
            xCoordinate: Math.round(relativeX * 2),
            yCoordinate: Math.round(relativeY * 2), 
            color: "ffaa00",
            font: "New Roman",
            fontBold: "public/fonts/Alegreya_Sans/AlegreyaSans-Bold.ttf",
            fontMedium: "public/fonts/Alegreya_Sans/AlegreyaSans-Medium.ttf",
            fontColor: "ffaa00",
            fontSize: 30,
            fontStyle: "normal",
            textAlign: "left",
            width: Math.round(width1),
            breadth: 30,
          };

          setSubmittedData(prevSubmittedData => ({
            ...prevSubmittedData,
            [selectedField]: updatedParam,
          }));

        } else {
          const width = calculateWidth(xStartCoordinatesField1, yStartCoordinatesField1, relativeX, relativeY);
          setWidth1(width);
          setCurrentClick(1);
      
          setSubmittedData(prevSubmittedData => {
            const updatedParams = { ...prevSubmittedData[selectedField] };
            updatedParams.width = width;
            
            return {
              ...prevSubmittedData,
              [selectedField]: updatedParams,
            };
          });
        }
      }

    return (
        <div>
            <img 
              src={base64String}
              onDoubleClick={handleImageDoubleClick}
            />

            <div style={{ ...newMenuStyle, position: 'fixed', zIndex: 1000, backgroundColor: 'white', padding: '15px', fontSize: "14px", borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px", marginTop: "20px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Certificate Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="markingField"   
                    >
                      {
                        data?.map((type, index) => (
                          <MenuItem value={type?.name} key={index} onClick={() => {setCurrentCertificateType(type); setCertificateTypeId(type?.id)}}>
                            {type?.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </div>
               <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <TextField id="outlined-basic"  variant="outlined" type='file' onChange={handleFileUpload}/>
                </div>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type Fields</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="markingField"
                      disabled={!currentCertificateType} 
                      onChange={() => {
                        setXStartCoordinatesField1(null)
                        setYStartCoordinatesField1(null)
                        setWidth1(null)
                      }}  
                    >
                      {
                        currentCertificateType &&
                        Object.entries(currentCertificateType?.params)?.map((field, index) => (
                          <MenuItem value={field[0]} key={index} onClick={() => {setSelectedField(field[0])}}>{field}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={xStartCoordinatesField1 || ''}
                    />
                    <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={yStartCoordinatesField1 || ''}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", marginBottom: "10px", marginTop: "10px" }}>
                    <TextField id="outlined-basic"  variant="outlined" value={width1 || ""}/>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>
                    Send
                    </Button>
                </div>

                <div style={{ position: "absolute" , top: 0, right: 0 }}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Position
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    sx={{ zIndex: 1000000 }}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => {setnewMenuStyle({top: '10px', right: '10px'}); handleClose()}}>Top - Right</MenuItem>
                    <MenuItem onClick={() => {setnewMenuStyle({bottom: '10px', right: '10px'}); handleClose()}}>Bottom - Right</MenuItem>
                    <MenuItem onClick={() => {setnewMenuStyle({top: '10px', left: '10px'}); handleClose()}}>Top - Left</MenuItem>
                    <MenuItem onClick={() => {setnewMenuStyle({bottom: '10px', left: '10px'}); handleClose()}}>Bottom - Left</MenuItem>
                  </Menu>
                </div>
            </div>
        </div>
    );
};

export default Login3;
