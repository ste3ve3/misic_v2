import { Button, ButtonBase, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { IconCameraPlus } from '@tabler/icons';

const ChooseFileImage = ({ title, onSelect, selected, error, fullWidth = true }) => {
    const handleClickUpload = (e) => {
        // setError('');
        const input = document.getElementById('choose-file-upload');
        input?.click();
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        // setSelectedImage(files[0]);
        var reader = new FileReader();

        reader.onloadend = function () {
            //Base 64
            onSelect(reader.result);
        };

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };
    return (
        <Stack sx={{ my: 1 }} alignItems="start" spacing={2}>
            <Typography>{title}</Typography>

            {selected && <img src={selected} alt="Choosen" style={{ objectFit: 'contain', height: 200, borderRadius: 10 }} />}
            {error && (
                <Typography variant="caption" color="error">
                    {error}
                </Typography>
            )}
            {!selected && (
                <ButtonBase
                    onClick={handleClickUpload}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: fullWidth ? '100%' : '50%',
                            lg: fullWidth ? '100%' : '30%'
                        }
                    }}
                >
                    <Stack
                        sx={{ height: 200, width: '100%', borderRadius: 3, border: 1 }}
                        justifyContent="center"
                        alignItems={'center'}
                        spacing={0.5}
                    >
                        <IconCameraPlus size={30} />
                        <Typography>Click to select a photo</Typography>
                    </Stack>
                </ButtonBase>
            )}
            <input type="file" id="choose-file-upload" hidden accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
            {selected && (
                <Button variant="outlined" color="secondary" component="label" onClick={handleClickUpload}>
                    Change Image
                </Button>
            )}
        </Stack>
    );
};

export default ChooseFileImage;
