import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    CircularProgress,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'components/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { API } from 'api';
import { toast } from 'react-hot-toast';

    const initFormData = {
        phoneNumber: '',
        password: ''
    };

  const initState = { loading: false, error: null };

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [normalAuthError, setNormalAuthError] = useState(null)

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNormalLogin = async (e) => {
        e.preventDefault();
        setState(initState);
        try {
          setState((prev) => ({ ...prev, loading: true }));
      
          let response;

          if (formData.phoneNumber !== '0788312609' || formData.password !== 'test123') {
            throw new Error('Invalid Credentials');
          } else {
            response = 
            response = await new Promise((resolve) => {
                setTimeout(() => {
                  resolve({ data: { userId: 1, fname: 'Christian', otherNames: 'Mugisha', role: 'top' } });
                }, 2000);
              });
          }
      
          await toast.promise(
            Promise.resolve(),
            {
              loading: `Checking credentials, please wait...`,
              success: `Logged In Successfully!`,
              error: `Invalid Credentials!`
            },
            { position: 'top-center' }
          );
      
          const userData = {
            id: response.data?.userId,
            firstName: response.data?.fname,
            lastName: response.data?.otherNames,
            role: response.data?.role
          }
      
          localStorage.setItem("loggedInUser", JSON.stringify(userData));
      
          setFormData(initFormData);
          navigate('/');
        } catch (error) {
          console.log(error);
          setState((prev) => ({
            ...prev,
            error: error.response?.data?.message || error.message || 'Unknown error occurred, please try again.'
          }));
          if (error.message === 'Invalid Credentials') {
            setNormalAuthError('Invalid Credentials');
          }
        } finally {
          setState((prev) => ({ ...prev, loading: false }));
        }
      };
      
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik>
                <form noValidate onSubmit={handleNormalLogin} {...others}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">Phone number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            label="Phone number"
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
