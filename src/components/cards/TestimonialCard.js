import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions, Chip, Stack, styled } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';

const CustomTypography = styled(Typography)`
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export default function TestimonialCard({ testimonial, onClick, isActive }) {
    return (
        <Card sx={{ position: 'relative', opacity: isActive ? 0.5 : 1 }}>
            <CardActionArea disabled={isActive}>
                <Stack direction={'row'} justifyContent={'center'} sx={{ m: 2 }}>
                    <Avatar
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{
                            width: 70,
                            height: 70
                        }}
                    />
                </Stack>
                <CardContent sx={{ px: 2, py: 1, textAlign: 'center' }}>
                    <CustomTypography gutterBottom variant="h5" component="div">
                        {testimonial.name}
                    </CustomTypography>
                    <CustomTypography variant="body2" color="text.secondary">
                        {testimonial.testimonial}
                    </CustomTypography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ py: 1, px: 2 }}>
                <Button
                    size="small"
                    color="secondary"
                    disabled={isActive}
                    startIcon={<IconEdit size={16} />}
                    onClick={() => onClick('edit')}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    color="primary"
                    disabled={isActive}
                    startIcon={<IconTrash size={16} />}
                    onClick={() => onClick('delete')}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
