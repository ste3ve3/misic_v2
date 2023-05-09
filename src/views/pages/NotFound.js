import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';

const NotFound = () => {
    const nav = useNavigate();
    return (
        <MainCard title="Page Not Found">
            <Typography variant="body2">The page you are looking for does not exist.</Typography>
            <Button sx={{ mt: 2 }} onClick={() => nav('/')}>
                Go to Home
            </Button>
        </MainCard>
    );
};

export default NotFound;
