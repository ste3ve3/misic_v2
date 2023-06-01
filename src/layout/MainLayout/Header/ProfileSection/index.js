import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    CircularProgress,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Link,
    Typography
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';
import { IconLogout, IconLogin, IconSettings, IconUser } from '@tabler/icons';
import { getLoggedInUser } from 'store/actions/auth';
import { connect } from 'react-redux';
import { API, useFetcher } from 'api';
import { toast } from 'react-hot-toast';

const initState = { loading: false, error: null };

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha('#d1f1f8', 0.70),
  }));

const ProfileSection = ({ getUser }) => {
    const { data, isError, isLoading } = useFetcher('/auth/loggedInUser');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        if (!loggedInUser) {
          navigate('/login');
        }
      }, [loggedInUser]);
    
    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser")
        navigate('/login')
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        loggedInUser &&
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: 'rgb(0, 180, 208)',
                        background: 'rgb(0, 180, 208)',
                        color: 'white',
                        '& svg': {
                            stroke: 'white'
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={loggedInUser?.picture?.url}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            background: '#023C45'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {loggedInUser?.names?.charAt(0)}
                    </Avatar>
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color='rgb(0, 180, 208)' />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>
                                            
                                        <Box sx={{ mx: 2.5 }}>
                                            <Link underline="none">
                                            <StyledAccount>
                                                <Avatar  
                                                src={loggedInUser?.picture?.url}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    background: '#023C45'
                                                }} 
                                                alt={loggedInUser?.names}
                                                >
                                                  {loggedInUser?.names?.charAt(0)}
                                                </Avatar>

                                                <Box sx={{ ml: 2 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: 'text.primary', font: 'bold' }}
                                                >
                                                    {loggedInUser?.lastName +' '+loggedInUser?.firstName}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {loggedInUser?.role}
                                                </Typography>
                                                </Box>
                                            </StyledAccount>
                                            </Link>
                                        </Box>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogin stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText 
                                                        primary={<Typography 
                                                        variant="body2"
                                                    >
                                                        Logout
                                                    </Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (data) => dispatch(getLoggedInUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
