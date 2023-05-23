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
import { addTestimonial, deleteTestimonial, editTestimonial, getAllTestimonials } from 'store/actions/testimonial';
import TestimonialCard from 'components/cards/TestimonialCard';

const initFormData = {
    name: '',
    role: '',
    testimonial: '',
    image: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const TestimonialsPage = ({ testimonials, paginationDetails, getTestimonials, addTestimonial, editTestimonial, deleteTestimonial }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);

    const { data, isError, isLoading } = useFetcher('/testimonials');

    useEffect(() => {
        if (data?.data?.length) {
            getTestimonials({ testimonials: data?.data, paginationDetails: data?.paginationDetails });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentTestimonial) {
            setFormData({
                image: currentTestimonial.image,
                isPublic: currentTestimonial.isPublic,
                role: currentTestimonial.role,
                testimonial: currentTestimonial.testimonial,
                name: currentTestimonial.name
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentTestimonial]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentTestimonial) {
                const newObj = compareObj(currentTestimonial, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/testimonials/updateTestimonial?testimonialId=${currentTestimonial._id}`, newObj),
                    {
                        loading: `Updating testimonial, please wait...`,
                        success: `Testimonial ${currentTestimonial.name} updated successfully!`,
                        error: `Something went wrong while updating testimonial`
                    },
                    { position: 'top-right' }
                );
                editTestimonial(result.data.data);
                setCurrentTestimonial(null);
            } else {
                const result = await toast.promise(
                    API.post(`/testimonials/create`, formData),
                    {
                        loading: `Adding testimonial, please wait...`,
                        success: `Testimonial added successfully!`,
                        error: `Something went wrong while adding testimonial`
                    },
                    { position: 'top-right' }
                );
                addTestimonial(result.data.data);
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
        setCurrentTestimonial(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentTestimonial(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Testimonials</Typography>
                <Sidebar
                    title={currentTestimonial ? 'Update Testimonial' : 'New Testimonial'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentTestimonial(null);
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
                        multiline
                        rows={4}
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Testimonial"
                        color="secondary"
                        multiline
                        rows={6}
                        value={formData.testimonial}
                        onChange={(e) => handleChange('testimonial', e.target.value)}
                        fullWidth
                        required
                    />
                    <ChooseFileImage selected={formData.image} title="Image" onSelect={(selected) => handleChange('image', selected)} />

                    <IosSwitch value={formData.isPublic} onChange={(value) => handleChange('isPublic', value)} label="Is Public" />
                </Sidebar>
            </Stack>
            <DataWidget
                title="Testimonials"
                isLoading={isLoading && !testimonials.length}
                isError={isError && !testimonials.length}
                isEmpty={!testimonials.length}
                customLoaders={<ProjectsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {testimonials.map((testimonial, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <TestimonialCard
                                    testimonial={testimonial}
                                    isActive={currentTestimonial?._id === testimonial._id}
                                    onClick={(action) => {
                                        setCurrentTestimonial(testimonial);
                                        action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete Testimonial?"
                subTitle={`Are you sure do you want to delete this testimonial? `}
                item={currentTestimonial?.name}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentTestimonial?._id;
                    const title = currentTestimonial?.name;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/testimonials/delete?testimonialId=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Testimonial ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting testimonial, please try again';
                                }
                            }
                        });
                        deleteTestimonial(id);
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
    testimonials: state.testimonial.testimonials,
    paginationDetails: state.testimonial.paginationDetails
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTestimonials: (data) => dispatch(getAllTestimonials(data)),
        addTestimonial: (data) => dispatch(addTestimonial(data)),
        deleteTestimonial: (id) => dispatch(deleteTestimonial(id)),
        editTestimonial: (data) => dispatch(editTestimonial(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestimonialsPage);
