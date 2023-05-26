import { Grid, Stack, TextField, Typography } from '@mui/material';
import { API, useFetcher } from 'api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import DataWidget from 'components/Global/DataWidget';
import ModalDialog from 'components/Global/ModalDialog';
import Sidebar from 'components/Global/Sidebar';
import IosSwitch from 'components/extended/IosSwitch';
import ProjectsLoaders from 'components/cards/Skeleton/ProjectsLoaders';
import { compareObj } from 'utils/constants';
import TestimonialCard from 'components/cards/TestimonialCard';
import { addFather, deleteFather, editFather, getAllFathers } from 'store/actions/father';

const initFormData = {
    name: '',
    role: '',
    background: '',
    image: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const FathersPage = ({ fathers, getFathers, addFather, editFather, deleteFather }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentFather, setCurrentFather] = useState(null);

    const { data, isError, isLoading } = useFetcher('/priests?all=true');

    useEffect(() => {
        if (data?.data?.length) {
            getFathers({ fathers: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentFather) {
            setFormData({
                image: currentFather.image,
                isPublic: currentFather.isPublic,
                role: currentFather.role,
                background: currentFather.background,
                name: currentFather.name
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentFather]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentFather) {
                const newObj = compareObj(currentFather, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/priests/updatePriest?priestId=${currentFather._id}`, newObj),
                    {
                        loading: `Updating priest, please wait...`,
                        success: `Priest ${currentFather.name} updated successfully!`,
                        error: `Something went wrong while updating priest`
                    },
                    { position: 'top-right' }
                );
                editFather(result.data.data);
                setCurrentFather(null);
            } else {
                const result = await toast.promise(
                    API.post(`/priests/create`, formData),
                    {
                        loading: `Adding priest, please wait...`,
                        success: `Priest added successfully!`,
                        error: `Something went wrong while adding priest`
                    },
                    { position: 'top-right' }
                );
                addFather(result.data.data);
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
        setCurrentFather(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentFather(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Priests</Typography>
                <Sidebar
                    title={currentFather ? 'Update Priest' : 'New Priest'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentFather(null);
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
                        label="Role"
                        color="secondary"
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Background"
                        color="secondary"
                        multiline
                        rows={10}
                        value={formData.background}
                        onChange={(e) => handleChange('background', e.target.value)}
                        fullWidth
                        required
                    />
                    <ChooseFileImage selected={formData.image} title="Image" onSelect={(selected) => handleChange('image', selected)} />

                    <IosSwitch value={formData.isPublic} onChange={(value) => handleChange('isPublic', value)} label="Is Public" />
                </Sidebar>
            </Stack>
            <DataWidget
                title="Priests"
                isLoading={isLoading && !fathers.length}
                isError={isError && !fathers.length}
                isEmpty={!fathers.length}
                customLoaders={<ProjectsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {fathers.map((father, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <TestimonialCard
                                    testimonial={{ ...father, testimonial: father.role }}
                                    isActive={currentFather?._id === father._id}
                                    onClick={(action) => {
                                        setCurrentFather(father);
                                        action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete Priest?"
                subTitle={`Are you sure do you want to delete this priest? `}
                item={currentFather?.name}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentFather?._id;
                    const title = currentFather?.name;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/priests/delete?priestId=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Priest ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting priest, please try again';
                                }
                            }
                        });
                        deleteFather(id);
                    } catch (error) {
                    } finally {
                        handleCloseModal();
                    }
                }}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    fathers: state.father.fathers
});

const mapDispatchToProps = (dispatch) => {
    return {
        getFathers: (data) => dispatch(getAllFathers(data)),
        addFather: (data) => dispatch(addFather(data)),
        deleteFather: (id) => dispatch(deleteFather(id)),
        editFather: (data) => dispatch(editFather(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FathersPage);
