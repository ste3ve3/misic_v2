import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    CircularProgress,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import { API } from 'api';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

    const initFormData = {
        email: '',
        password: ''
    };

  const initState = { loading: false, error: null, googleLoading: false, googleError: null };

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [normalAuthError, setNormalAuthError] = useState(null)
    const [googleAuthError, setGoogleAuthError] = useState(null)

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNormalLogin = async (e) => {
        e.preventDefault();
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
                await toast.promise(
                    API.post(`/auth/loginUser?isDashboardAuth=true`, formData),
                    {
                        loading: `Checking credentials, please wait...`,
                        success: `Logged In Successfully!`,
                        error: `Login was unsuccessfull!`
                    },
                    { position: 'top-center' }
                );
            setFormData(initFormData);
            navigate('/')
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
            if(error.response?.data?.message){
                setNormalAuthError(error.response?.data?.message);
            }
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const googleSuccess = (response) => {
        const accessToken = response.access_token;
    
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
        })
        .then(response => response.json())
        .then(async(data) => {
            setState(initState);
            try {
                setState((prev) => ({ ...prev, googleLoading: true }));
                    await toast.promise(
                        API.post(`/auth/googleAuth?isDashboardAuth=true`, data),
                        {
                            loading: `Checking credentials, please wait...`,
                            success: `Logged In Successfully!`,
                            error: `Login was unsuccessfull!`
                        },
                        { position: 'top-center' }
                    );
                navigate('/')
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    googleError: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
                }));
                if(error.response?.data?.message){
                    setGoogleAuthError(error.response?.data?.message);
                }
            } finally {
                setState((prev) => ({ ...prev, googleLoading: false }));
            }
        })
        .catch(error => {
          toast.error(error);
        });
      }
    
      const GoogleAuthentication = useGoogleLogin({
        onSuccess: (response) => googleSuccess(response),
        onError: (error) => toast.error(error)
      });


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    {googleAuthError && (
                        <Box sx={{ my: 2, color: 'red' , fontSize: '28px' }}>
                            <FormHelperText error sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>{googleAuthError}</FormHelperText>
                        </Box>
                    )}
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={GoogleAuthentication}
                            size="large"
                            variant="outlined"
                            startIcon={state.googleLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100],
                            }}
                        >
                            {
                                state.googleLoading ? 
                                    "Signing In..."
                                :
                                <>
                                    <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                        <img src={Google} alt="google" width={17} height={17} style={{ marginRight: matchDownSM ? 8 : 16, marginTop: 6 }} />
                                    </Box>
                                    Sign in with Google
                                </>  
                            }
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik>
                <form noValidate onSubmit={handleNormalLogin} {...others}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={(e) => handleChange('email', e.target.value)}
                            label="Email Address / Username"
                            inputProps={{}}
                        />
                    </FormControl>

                    <FormControl
                        fullWidth
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            name="password"
                            onChange={(e) => handleChange('password', e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            inputProps={{}}
                        />
                    </FormControl>
                    
                    {normalAuthError && (
                        <Box sx={{ mt: 2, color: 'red' , fontSize: '28px' }}>
                            <FormHelperText error sx={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>{normalAuthError}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                startIcon={state.loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                            >
                                {
                                    state.loading ? 'Signing In...' : 'Sign in'
                                }
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default FirebaseLogin;
