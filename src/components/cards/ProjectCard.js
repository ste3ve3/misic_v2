import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip, styled } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons';

function getStatus(startingDate, endingDate) {
    const currentDate = new Date();

    if (currentDate < startingDate) {
        return 'Upcoming';
    } else if (currentDate >= startingDate && currentDate <= endingDate) {
        return 'On Going';
    } else {
        return 'Completed';
    }
}

const CustomTypography = styled(Typography)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export default function ProjectCard({ project, onClick, isActive }) {
    const status = getStatus(new Date(project.startingDate), new Date(project.endingDate));
    return (
        <Card sx={{ position: 'relative', opacity: isActive ? 0.5 : 1 }}>
            <Chip
                label={status}
                size="small"
                color="secondary"
                sx={{
                    px: 0.5,
                    zIndex: 9,
                    top: 8,
                    right: 8,
                    position: 'absolute',
                    color: 'white',
                    backgroundColor: status === 'Upcoming' ? 'secondary.main' : status === 'Completed' ? 'primary.dark' : 'warning.dark'
                }}
            />
            <CardActionArea disabled={isActive}>
                <CardMedia component="img" image={project.projectImage} alt={project.projectTitle} sx={{ height: 150 }} />

                <CardContent sx={{ px: 2, py: 1 }}>
                    <CustomTypography gutterBottom variant="h5" component="div">
                        {project.projectTitle}
                    </CustomTypography>
                    <CustomTypography variant="body2" color="text.secondary">
                        {project.smallDescription}
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
