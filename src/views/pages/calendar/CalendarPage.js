import { Button, Grid, Skeleton, Stack, TextField, Typography, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { API, useFetcher } from 'api';
import { addEvent, deleteEvent, editEvent, getAllEvents, highlightEvent } from 'store/actions/calendar';
import { connect } from 'react-redux';
import DataWidget from 'components/Global/DataWidget';
import CalendarLoaders from 'components/cards/Skeleton/CalendarLoaders';
import CalendarCard from './elements/CalendarCard';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { IconCirclePlus, IconCircleMinus, IconEditCircle } from '@tabler/icons';
import Sidebar from 'components/Global/Sidebar';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import DatePickerValue from 'components/Global/DatePicker';
import { toast } from 'react-hot-toast';
import { compareObj } from 'utils/constants';
import { formattedDate } from 'utils/formatDate';
import ModalDialog from 'components/Global/ModalDialog';
import ReloadPageAfterTwoSeconds from 'utils/pageReload';

const initFormData = {
    eventName: '',
    startingTime: '',
    endingTime: '',
    eventDate: ''
  };

const initState = { loading: false, error: null };

const CalendarPage = ({ events, getEvents }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [current, setCurrent] = useState(0);
    const [showDescription, setShowDescription] = useState(false)
    const [pageRefresh, setPageRefresh] = useState(false)
    const { data, isError, isLoading } = useFetcher('/calendar');
    const currentWeek = events[current]; 

    const handlePrevClick = () => {
        if (current !== 0) {
            setCurrent(current - 1);
        }
    };

    const handleNextClick = () => {
        if (current < data?.calendarData?.length - 1) {
            setCurrent(current + 1);
        }
    };

    useEffect(() => {
        if (data?.calendarData?.length) { 
            getEvents({ events: data?.calendarData });
        }
    }, [data?.calendarData?.length]);

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
        setFormData((prev) => {
          const updatedFormData = { ...prev };
      
          if (name === 'eventDescription' || name === 'eventImage' || name === 'eventLocation') {
            if (value === '') {
              delete updatedFormData[name];
              delete initFormData[name]; 
            } else {
              updatedFormData[name] = value; 
              initFormData[name] = value;
            }
          } else {
            updatedFormData[name] = value;
            initFormData[name] = value;
          }
      
          return updatedFormData;
        });
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
                        success: `Event updated successfully!`,
                        error: `Something went wrong while updating event`
                    },
                    { position: 'top-center' }
                );
                setCurrentEvent(null); 
                setPageRefresh(true);  
            } else {
                const result = await toast.promise(
                    API.post(`/calendar/add`, formData),
                    {
                        loading: `Adding event, please wait...`,
                        success: `Event added successfully!`,
                        error: `Something went wrong while adding event`
                    },
                    { position: 'top-center' }
                );
                setPageRefresh(true);
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

    const highlightEvent = async () => {
        const id = currentEvent?._id;
        let payload;
        currentEvent?.isHighlighted ? payload = { isHighlighted: false } : payload = { isHighlighted: true }
        try {
            const result = await toast.promise(API.patch(`/calendar/highlightEvent?eventId=${id}`, payload), {
                loading: currentEvent?.isHighlighted ? `Hold on, we are unhighlighting this event.` : `Hold on, we are highlighting this event.`,
                success: currentEvent?.isHighlighted ? `Event unhighlighted successfully` : `Event highlighted successfully`,
                error: (error) => {
                    if (error.response) {
                        return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                    } else {
                        return 'Something went wrong while highlighting this event, please try again';
                    }
                }
            });
            setPageRefresh(true);
        } catch (error) {
        }
    }

    if(pageRefresh) {
        return <ReloadPageAfterTwoSeconds />
    }

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
                            handleChange('eventDate', formattedDate(val.$d));
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
                    <Button
                        onClick={(prev) => setShowDescription(!showDescription)}
                        variant="outlined"
                        startIcon={showDescription ? <IconCircleMinus /> : currentEvent ? <IconEditCircle /> : <IconCirclePlus />}
                        color="secondary"
                    >
                      {
                        showDescription ? "Hide Description" :
                        currentEvent ? 'Update Description' : 'Add Description'
                      }    
                    </Button>
                    {
                    showDescription &&
                    <>
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
                            onChange={(e) => handleChange('eventDescription', e.target.value ? e.target.value : '')}
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </>
                    }
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
                isLoading={isLoading && !events?.length} 
                isError={isError && !events?.length}
                isEmpty={!events?.length}
                customLoaders={<CalendarLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {currentWeek?.days?.map((weekDay, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                            <CalendarCard 
                                weekDay={weekDay.day} 
                                WeekDate={weekDay.date}
                                weekActivities={weekDay.events} 
                                onClick={(action) => {
                                    action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                }}
                                currentActivity={(activity) => {
                                    setCurrentEvent(activity);
                                }}
                                handleHighlightEvent={highlightEvent}
                                targettedEvent={currentEvent}
                            />
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete Event?"
                subTitle={`Are you sure you want to delete this event? `}
                item={currentEvent?.eventName}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentEvent?._id;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/calendar/deleteEvent?eventId=${id}`), {
                            loading: `Hold on, we are deleting this event from our system.`,
                            success: `Event deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting this event, please try again';
                                }
                            }
                        });
                        setPageRefresh(true);
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
    events: state.calendar.events
});

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (data) => dispatch(getAllEvents(data)),
        addEvent: (data) => dispatch(addEvent(data)),
        deleteEvent: (id) => dispatch(deleteEvent(id)),
        editEvent: (data) => dispatch(editEvent(data)),
        eventHighlight: (data) => dispatch(highlightEvent(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
