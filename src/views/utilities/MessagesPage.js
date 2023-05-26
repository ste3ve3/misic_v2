import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { API, useFetcher } from 'api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import DataWidget from 'components/Global/DataWidget';
import ModalDialog from 'components/Global/ModalDialog';
import { deleteMessage, getAllMessages } from 'store/actions/message';
import { IconMail, IconTrash } from '@tabler/icons';
import moment from 'moment';

const MessagesPage = ({ messages, getMessages, deleteMessage }) => {
    const [currentMessage, setCurrentMessage] = useState(null);

    const { data, isError, isLoading } = useFetcher('/messages?all=true');

    useEffect(() => {
        if (data?.data?.length) {
            getMessages({ messages: data?.data });
        }
    }, [data?.data?.length]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentMessage(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h3">Messages</Typography>
            </Stack>
            <DataWidget title="Messages" isLoading={isLoading && !messages.length} isError={isError} isEmpty={!messages.length}>
                {messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar color="primary">
                                    <Avatar sx={{ bgcolor: '#d2d2d2', color: 'white', height: 40, width: 40 }}>{`${index + 1}`}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <>
                                            <Stack sx={{ mb: 0.5 }}>
                                                <Typography variant="h5" sx={{ display: 'flex' }}>
                                                    {message.names}{' '}
                                                    <Typography variant="caption">
                                                        &nbsp; {' - '} {moment(message.createdAt).fromNow()}
                                                    </Typography>
                                                </Typography>
                                                <Typography
                                                    href={`tel:${message.phoneNumber}`}
                                                    component="a"
                                                    sx={{ color: 'secondary.main', textDecoration: 'none' }}
                                                >
                                                    {message.phoneNumber}
                                                </Typography>
                                            </Stack>
                                        </>
                                    }
                                    secondary={message.message}
                                />
                                <ListItemAvatar>
                                    <IconButton color="secondary" href={`mailto:${message.email}`} component="a">
                                        <IconMail size={16} />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => {
                                            setCurrentMessage(message);
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
                title="Delete Message?"
                subTitle={`Are you sure do you want to delete this message? `}
                item={currentMessage?.names}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentMessage?._id;
                    const title = currentMessage?.names;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/messages/delete?messageId=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Message by ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting message, please try again';
                                }
                            }
                        });
                        deleteMessage(id);
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
    messages: state.message.messages
});

const mapDispatchToProps = (dispatch) => {
    return {
        getMessages: (data) => dispatch(getAllMessages(data)),
        deleteMessage: (id) => dispatch(deleteMessage(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
