import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip, styled } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';
import moment from 'moment';

const CustomTypography = styled(Typography)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export default function NewsCard({ news, onClick, isActive }) {
    return (
        <Card sx={{ position: 'relative', opacity: isActive ? 0.5 : 1 }}>
            <CardActionArea disabled={isActive}>
                <CardMedia component="img" image={news.image} alt={news.title} sx={{ height: 150 }} />

                <CardContent sx={{ px: 2, py: 1 }}>
                    <CustomTypography gutterBottom variant="h5" component="div">
                        {news.title}
                    </CustomTypography>
                    <CustomTypography variant="body2" color="text.secondary">
                        {news.isPublic ? 'Published' : 'Unpublished'} {moment(news.updatedAt).fromNow()}
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
