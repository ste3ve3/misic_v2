import { Box, Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';
import React from 'react';

const BlogsLoaders = () => {
    return (
        <Grid container spacing={3} sx={{ my: 1 }}>
            {new Array(16).fill(0).map((_, index) => {
                return (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card sx={{ width: '100%', p: 0 }}>
                            <CardHeader
                                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                                title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                                subheader={<Skeleton animation="wave" height={10} width="40%" />}
                                sx={{ px: 2, py: 1 }}
                            />
                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        </Card>
                        <CardContent sx={{ p: 1 }}>
                            <React.Fragment>
                                <Skeleton animation="wave" height={12} style={{ marginBottom: 6 }} />
                                <Skeleton animation="wave" height={12} width="80%" />
                            </React.Fragment>
                        </CardContent>
                        {/* <Box key={index} sx={{ width: '100%' }}>
                            <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} animation="wave" />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton height={25} />
                                <Skeleton width="60%" height={25} />
                            </Box>
                            <CardActions sx={{ py: 1, px: 0 }}>
                                <Skeleton width="35%" height={40} />
                                <Skeleton width="35%" height={40} />
                            </CardActions>
                        </Box> */}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default BlogsLoaders;
