import { Card, CardHeader, Container, FormControl, Grid, MenuItem, OutlinedInput, Select, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { API, useFetcher } from 'api';
import { toast } from 'react-hot-toast';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import Sidebar from 'components/Global/Sidebar';
import { connect } from 'react-redux';
import { addLeader, deleteLeader, editLeader, getAllLeaders } from 'store/actions/leader';
import { useEffect } from 'react';
import { COMMISSIONS, compareObj } from 'utils/constants';
import DataWidget from 'components/Global/DataWidget';
import LeadersContainer from './components/LeadersContainer';
import ModalDialog from 'components/Global/ModalDialog';

const initFormData = {
    image: '',
    title: '',
    name: '',
    commission: 'executive_committee'
};

const initState = { loading: false, error: null };

const LeadersPage = ({ leaders, getLeaders, addLeader, editLeader, deleteLeader }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentLeader, setCurrentLeader] = useState(null);

    const { data, isError, isLoading } = useFetcher('/leaders?limit=30');

    useEffect(() => {
        if (data?.data?.length) {
            getLeaders({ leaders: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentLeader) {
            setFormData({
                image: currentLeader.image,
                name: currentLeader.name,
                title: currentLeader.title,
                commission: currentLeader.commission
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentLeader]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentLeader) {
                const newObj = compareObj(currentLeader, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/leaders/update?id=${currentLeader._id}`, newObj),
                    {
                        loading: `Updating leader, please wait...`,
                        success: `Leader ${currentLeader.name} updated successfully!`,
                        error: `Something went wrong while updating leader`
                    },
                    { position: 'top-right' }
                );
                editLeader(result.data.data);
                setCurrentLeader(null);
            } else {
                const result = await toast.promise(
                    API.post(`/leaders/create`, formData),
                    {
                        loading: `Adding leader, please wait...`,
                        success: `Leader added successfully!`,
                        error: `Something went wrong while adding leader`
                    },
                    { position: 'top-right' }
                );
                addLeader(result.data.data);
            }
            setFormData(initFormData);
            setOpenSidebar(false);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };
    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };
    const handleCloseSidebar = () => {
        if (state.loading) return;
        setOpenSidebar(false);
        setCurrentLeader(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentLeader(null);
    };
    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3"></Typography>
                <Sidebar
                    title={'New Leader'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentLeader(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <TextField
                        label="Name"
                        color="secondary"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Title"
                        color="secondary"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        fullWidth
                        required
                    />

                    <ChooseFileImage
                        selected={formData.image}
                        title="Leader's Picture"
                        onSelect={(selected) => handleChange('image', selected)}
                    />
                    <FormControl fullWidth>
                        <Typography sx={{ my: 2, opacity: 0.5 }}>Commission</Typography>
                        <Select
                            labelId="select"
                            id="select"
                            value={formData.commission}
                            onChange={(e) => handleChange('commission', e.target.value)}
                            label="Select Membership"
                            required
                            color="secondary"
                            input={<OutlinedInput />}
                        >
                            {COMMISSIONS.map((commission, index) => {
                                return (
                                    <MenuItem value={commission.value} key={index}>
                                        {commission.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Sidebar>
            </Stack>
            <DataWidget
                title="Leaders"
                isLoading={isLoading && !leaders.length}
                isError={isError && !leaders.length}
                isEmpty={!leaders.length}
                customLoaders={
                    <Grid container spacing={3} sx={{ my: 1 }}>
                        {new Array(12).fill(0).map((_, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardHeader
                                            avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                                            title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
                                            subheader={<Skeleton animation="wave" height={10} width="40%" />}
                                        />
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                }
            >
                <LeadersContainer
                    leaders={leaders}
                    onClick={(value, action) => {
                        setCurrentLeader(value);
                        action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                    }}
                />
            </DataWidget>
            <ModalDialog
                title="Delete Leader?"
                subTitle={`Are you sure do you want to delete this leader? `}
                item={currentLeader?.name}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentLeader?._id;
                    const title = currentLeader?.name;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/leaders/delete?id=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Leader ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting leader, please try again';
                                }
                            }
                        });
                        deleteLeader(id);
                    } catch (error) {
                    } finally {
                        handleCloseModal();
                    }
                }}
            />
        </Container>
    );
};

const mapStateToProps = (state) => ({
    leaders: state.leader.leaders
});

const mapDispatchToProps = (dispatch) => {
    return {
        getLeaders: (data) => dispatch(getAllLeaders(data)),
        addLeader: (data) => dispatch(addLeader(data)),
        deleteLeader: (id) => dispatch(deleteLeader(id)),
        editLeader: (data) => dispatch(editLeader(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadersPage);
