import { Avatar, Card, CardHeader, Container, Grid, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconArrowRight, IconDotsVertical, IconEdit, IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { COMMISSIONS } from 'utils/constants';

const PURE_COMMISSIONS = COMMISSIONS.filter((c) => c.value !== 'executive_committee');

const LeadersContainer = ({ leaders, onClick }) => {
    const [currentCommission, setCurrentCommission] = useState(0);
    const [currentLeader, setCurrentLeader] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const handleOpenMenu = (e) => {
        setOpenMenu(e.target);
    };
    const handleCloseMenu = () => {
        setOpenMenu(null);
        setCurrentLeader(null);
    };

    return (
        <Container>
            <Typography variant="h3" color="secondary">
                Executive Committee
            </Typography>
            <Grid container spacing={3} sx={{ my: 1 }}>
                {leaders
                    .filter((leader) => leader.commission === 'executive_committee')
                    .map((leader, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader
                                        avatar={<Avatar alt={leader.name} src={leader.image} />}
                                        action={
                                            <IconButton
                                                aria-label="settings"
                                                onClick={(e) => {
                                                    handleOpenMenu(e);
                                                    setCurrentLeader(leader);
                                                }}
                                            >
                                                <IconDotsVertical size={16} />
                                            </IconButton>
                                        }
                                        title={leader.name}
                                        subheader={leader.title}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" sx={{ my: 3, flexGrow: 1 }} color="secondary">
                    {PURE_COMMISSIONS[currentCommission].label}
                </Typography>
                <IconButton disabled={currentCommission === 0} onClick={() => setCurrentCommission((prev) => prev - 1)}>
                    <IconArrowLeft />
                </IconButton>
                <IconButton
                    disabled={currentCommission === PURE_COMMISSIONS.length - 1}
                    onClick={() => setCurrentCommission((prev) => prev + 1)}
                >
                    <IconArrowRight />
                </IconButton>
            </Stack>

            <Grid container spacing={3}>
                {leaders
                    .filter((leader) => leader.commission === PURE_COMMISSIONS[currentCommission].value)
                    .map((leader, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader
                                        avatar={<Avatar alt={leader.name} src={leader.image} />}
                                        action={
                                            <IconButton
                                                aria-label="settings"
                                                onClick={(e) => {
                                                    handleOpenMenu(e);
                                                    setCurrentLeader(leader);
                                                }}
                                            >
                                                <IconDotsVertical size={16} />
                                            </IconButton>
                                        }
                                        title={leader.name}
                                        subheader={leader.title}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>
            <Popover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75
                        }
                    }
                }}
            >
                <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                        onClick(currentLeader, 'edit');
                        handleCloseMenu();
                    }}
                >
                    <IconEdit />
                    <Typography sx={{ pl: 2 }}>Edit</Typography>
                </MenuItem>
                <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                        onClick(currentLeader, 'delete');
                        handleCloseMenu();
                    }}
                >
                    <IconTrash />
                    <Typography sx={{ pl: 2 }}>Delete</Typography>
                </MenuItem>
            </Popover>
        </Container>
    );
};

export default LeadersContainer;
