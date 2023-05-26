import { Avatar, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from '@mui/material';
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
import { addAnnouncement, deleteAnnouncement, editAnnouncement, getAllAnnouncements } from 'store/actions/announcement';
import DatePickerValue from 'components/Global/DatePicker';
import { IconEdit, IconTrash } from '@tabler/icons';
import moment from 'moment';

const initFormData = {
    announcement: '',
    removeAt: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const AnnouncementsPage = ({ announcements, getAnnouncements, addAnnouncement, editAnnouncement, deleteAnnouncement }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    const { data, isError, isLoading } = useFetcher('/announcements?all=true&limit=100');

    useEffect(() => {
        if (data?.data?.length) {
            getAnnouncements({ announcements: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentAnnouncement) {
            setFormData({
                removeAt: currentAnnouncement.removeAt,
                isPublic: currentAnnouncement.isPublic,
                announcement: currentAnnouncement.announcement
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentAnnouncement]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentAnnouncement) {
                const newObj = compareObj(currentAnnouncement, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/announcements/update?id=${currentAnnouncement._id}`, newObj),
                    {
                        loading: `Updating announcement, please wait...`,
                        success: `Announcement updated successfully!`,
                        error: `Something went wrong while updating announcement`
                    },
                    { position: 'top-right' }
                );
                editAnnouncement(result.data.data);
                setCurrentAnnouncement(null);
            } else {
                const result = await toast.promise(
                    API.post(`/announcements/create`, formData),
                    {
                        loading: `Adding announcement, please wait...`,
                        success: `Announcement added successfully!`,
                        error: `Something went wrong while adding announcement`
                    },
                    { position: 'top-right' }
                );
                addAnnouncement(result.data.data);
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
        setCurrentAnnouncement(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentAnnouncement(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Announcements</Typography>
                <Sidebar
                    title={currentAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentAnnouncement(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <TextField
                        label="Announcement"
                        color="secondary"
                        multiline
                        rows={10}
                        value={formData.announcement}
                        onChange={(e) => handleChange('announcement', e.target.value)}
                        fullWidth
                        required
                    />
                    <DatePickerValue label="Remove At" value={formData.removeAt} onChange={(val) => handleChange('removeAt', val.$d)} />
                    <IosSwitch value={formData.isPublic} onChange={(value) => handleChange('isPublic', value)} label="Is Public" />
                </Sidebar>
            </Stack>
            <DataWidget
                title="Announcements"
                isLoading={isLoading && !announcements.length}
                isError={isError && !announcements.length}
                isEmpty={!announcements.length}
                customLoaders={<ProjectsLoaders />}
            >
                {announcements.map((announcement, index) => {
                    return (
                        <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar color="primary">
                                    <Avatar sx={{ bgcolor: '#d2d2d2', color: 'white', height: 40, width: 40 }}>{`${index + 1}`}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${announcement.isPublic ? 'Published ' : 'Unpublished '} ${moment(
                                        announcement.updatedAt
                                    ).fromNow()}`}
                                    secondary={announcement.announcement}
                                />
                                <ListItemAvatar>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => {
                                            setCurrentAnnouncement(announcement);
                                            handleOpenSidebar();
                                        }}
                                    >
                                        <IconEdit size={16} />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => {
                                            setCurrentAnnouncement(announcement);
                                            handleOpenModal();
                                        }}
                                    >
                                        <IconTrash size={16} />
                                    </IconButton>
                                </ListItemAvatar>
                            </ListItem>
                            <Divider variant="inset" />
                        </div>
                    );
                })}
            </DataWidget>
            <ModalDialog
                title="Delete Announcement?"
                subTitle={`Are you sure do you want to delete this announcement? `}
                item={currentAnnouncement?.name}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentAnnouncement?._id;
                    // const title = currentAnnouncement?.name;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/announcements/delete?id=${id}`), {
                            loading: `Hold on, we are deleting from our system.`,
                            success: `Announcement has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting announcement, please try again';
                                }
                            }
                        });
                        deleteAnnouncement(id);
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
    announcements: state.announcement.announcements
});

const mapDispatchToProps = (dispatch) => {
    return {
        getAnnouncements: (data) => dispatch(getAllAnnouncements(data)),
        addAnnouncement: (data) => dispatch(addAnnouncement(data)),
        deleteAnnouncement: (id) => dispatch(deleteAnnouncement(id)),
        editAnnouncement: (data) => dispatch(editAnnouncement(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage);
