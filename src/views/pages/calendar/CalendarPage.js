import { Box, CardActions, Grid, Skeleton, Stack, TextField, Typography, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { API, useFetcher } from 'api';
import { addEvent, deleteEvent, editEvent, getAllEvents } from 'store/actions/calendar';
import { connect } from 'react-redux';
import DataWidget from 'components/Global/DataWidget';
import ProjectsLoaders from 'components/cards/Skeleton/ProjectsLoaders';
import CalendarCard from './elements/CalendarCard';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import Sidebar from 'components/Global/Sidebar';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import DatePickerValue from 'components/Global/DatePicker';
import { toast } from 'react-hot-toast';
import { compareObj } from 'utils/constants';

const initFormData = {
    eventName: '',
    startingTime: '',
    endingTime: '',
    eventDate: '',
    eventImage: '',
    eventLocation: '',
    eventDescription: ''
};

const initState = { loading: false, error: null };

const CalendarPage = ({ events, getEvents, addEvent, deleteEvent, editEvent }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [current, setCurrent] = useState(0);
    const { data, isError, isLoading } = useFetcher('/calendar');
    const currentWeek = data?.calendarData[current]; 

    const handlePrevClick = () => {
        if (current !== 0) {
            setCurrent(current - 1);
        }
    };

    const handleNextClick = () => {
        if (current < data.length - 1) {
            setCurrent(current + 1);
        }
    };

    useEffect(() => {
        if (data?.data?.length) {
            getEvents({ events: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentEvent) {
            setFormData({
                eventName: currentEvent.eventName,
                startingTime: currentEvent.startingTime,
                endingTime: currentEvent.endingTime,
                eventDate: currentEvent.eventDate,
                eventImage:currentEvent.eventImage,
                eventLocation: currentEvent.eventLocation,
                eventDescription: currentEvent.eventDescription
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentEvent]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentEvent) {
                const newObj = compareObj(currentEvent, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/calendar/updateEvent?eventId=${currentEvent._id}`, newObj),
                    {
                        loading: `Updating event, please wait...`,
                        success: `Event ${currentEvent.eventName} updated successfully!`,
                        error: `Something went wrong while updating event`
                    },
                    { position: 'top-right' }
                );
                editEvent(result.data.data);
                setCurrentEvent(null);
            } else {
                const result = await toast.promise(
                    API.post(`/calendar/add`, formData),
                    {
                        loading: `Adding event, please wait...`,
                        success: `Event added successfully!`,
                        error: `Something went wrong while adding event`
                    },
                    { position: 'top-right' }
                );
                addEvent(result.data.data);
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
        setCurrentEvent(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentEvent(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Cathedral's Events</Typography>
                <Sidebar
                    title={currentEvent ? 'Update Event' : 'New Event'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentEvent(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <TextField
                        label="Event Name"
                        color="secondary"
                        value={formData.eventName}
                        onChange={(e) => handleChange('eventName', e.target.value)}
                        fullWidth
                        required
                    />
                    <DatePickerValue
                        label="Event Date"
                        value={formData.eventDate}
                        onChange={(val) => {
                            const eventDate = new Date(val.$d);
                            const formattedDate = eventDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                            });
                            handleChange('eventDate', formattedDate);
                        }}
                    />
                    <TextField
                        label="Starting Time"
                        color="secondary"
                        value={formData.startingTime}
                        onChange={(e) => handleChange('startingTime', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Ending Time"
                        color="secondary"
                        value={formData.endingTime}
                        onChange={(e) => handleChange('endingTime', e.target.value)}
                        fullWidth
                        required
                    />
                    <ChooseFileImage
                        title="Event Image"
                        selected={formData.eventImage}
                        onSelect={(selected) => handleChange('eventImage', selected)}
                    />
                    <TextField
                        label="Event Location"
                        color="secondary"
                        value={formData.eventLocation}
                        onChange={(e) => handleChange('eventLocation', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Event Description"
                        color="secondary"
                        value={formData.eventDescription}
                        onChange={(e) => handleChange('eventDescription', e.target.value)}
                        multiline
                        rows={6}
                        fullWidth
                    />
                </Sidebar>
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                <Typography variant="h4" style={{  fontWeight: 'bold' }}>
                    {currentWeek?.title}
                </Typography>
                {data?.calendarData?.length > 1 && (
                    <div style={{ display: 'flex', gap: '5', marginTop: '7' }}>
                    <IconButton
                        style={{ color: '#00b4d0', fontWeight: 'bolder', fontSize: '2rem', cursor: 'pointer' }}
                        onClick={handlePrevClick}
                        disabled={current === 0}
                    >
                        <BsFillArrowLeftCircleFill style={{ opacity: current === 0 ? '0.7' : '1' }} />
                    </IconButton>
                    <IconButton
                        style={{ color: '#00b4d0', fontWeight: 'bolder', fontSize: '2rem', cursor: 'pointer' }}
                        onClick={handleNextClick}
                        disabled={current === data?.calendarData?.length - 1}
                    >
                        <BsFillArrowRightCircleFill
                        style={{ opacity: current === data?.calendarData?.length - 1 ? '0.7' : '1' }}
                        />
                    </IconButton>
                    </div>
                )}
            </div>
            <DataWidget
                title="Events"
                isLoading={isLoading && !data?.calendarData?.length} 
                isError={isError && !data?.calendarData?.length}
                isEmpty={!data?.calendarData?.length}
                customLoaders={<ProjectsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {currentWeek?.days?.map((weekDay, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={5}>
                            <CalendarCard weekDay={weekDay.day} weekActivities={weekDay.events} />
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
        </div>
    );
};

const mapStateToProps = (state) => ({
    events: state.calendar.events
});

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (data) => dispatch(getAllEvents(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
