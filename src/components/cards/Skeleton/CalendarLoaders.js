import { Box, CardActions, Grid, Skeleton } from '@mui/material';

const CalendarLoaders = () => {
    return (
        <Grid container spacing={3} sx={{ my: 1 }}>
            {new Array(16).fill(0).map((_, index) => {
                return (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Box key={index} sx={{ width: '100%' }}>
                            <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} animation="wave" />
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default CalendarLoaders;
