import { Box, Button, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import { API } from 'api';
import ChooseFileImage from 'components/Global/ChooseFileImage';
import MessageAlert from 'components/Global/MessageAlert';
import IosSwitch from 'components/extended/IosSwitch';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { addBlog, editBlog } from 'store/actions/blog';
import { compareObj } from 'utils/constants';
import RichTextEditor from './RichTextEditor';

const initFormData = {
    title: '',
    postDescription: '',
    postBody: '',
    postImage: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const AddBlogForm = ({ currentBlog, addBlog, editBlog }) => {
    const nav = useNavigate();

    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);

    useEffect(() => {
        if (currentBlog) {
            setFormData({
                title: currentBlog.title,
                postDescription: currentBlog.postDescription,
                postBody: currentBlog.postBody,
                postImage: currentBlog.postImage,
                isPublic: currentBlog.isPublic
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentBlog]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.loading) return;
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentBlog) {
                const newObj = compareObj(currentBlog, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(API.patch(`/blog/updatePost?slug=${currentBlog.slug}`, newObj), {
                    loading: `Updating blog, please wait...`,
                    success: `Blog ${currentBlog.title} updated successfully!`,
                    error: (error) => {
                        if (error.response) {
                            return `Error: ${error.response?.data?.message}`;
                        } else {
                            return 'Something went wrong while updating blog, please try again';
                        }
                    }
                });
                editBlog({ ...result.data.data, postCreator: result.data.data.createdBy });
            } else {
                const result = await toast.promise(API.post(`/blog/create`, formData), {
                    loading: `Adding blog, please wait...`,
                    success: `Blog added successfully!`,
                    error: (error) => {
                        if (error.response) {
                            return `Error: ${error.response.data.message}`;
                        } else {
                            return 'Something went wrong while adding blog, please try again';
                        }
                    }
                });
                addBlog({ ...result.data.data, postCreator: result.data.data.createdBy });
            }
            setFormData(initFormData);
            nav('/content/blogs');
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            {/* <MessageAlert state={state} /> */}
            <Stack spacing={1.2} sx={{ p: { xs: 0, md: 1, lg: 2 } }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    {currentBlog ? 'Update' : 'New'} Blog - {formData.title}
                </Typography>
                <TextField
                    label="Title"
                    color="secondary"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Introduction"
                    color="secondary"
                    multiline
                    rows={4}
                    value={formData.postDescription}
                    onChange={(e) => handleChange('postDescription', e.target.value)}
                    fullWidth
                    required
                />
                <RichTextEditor onChange={(html) => handleChange('postBody', html)} html={formData.postBody} />
                <ChooseFileImage
                    selected={formData.postImage}
                    fullWidth={false}
                    title="Blog Image"
                    onSelect={(selected) => handleChange('postImage', selected)}
                />
                <IosSwitch label="Publish Immediately" value={formData.isPublic} onChange={(value) => handleChange('isPublic', value)} />
                <Box sx={{ py: 3 }}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        sx={{ color: '#ffffff' }}
                        startIcon={state.loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    >
                        {state.loading ? 'Loading...' : currentBlog ? 'Update Blog' : 'New Blog'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBlog: (data) => dispatch(addBlog(data)),
        editBlog: (data) => dispatch(editBlog(data))
    };
};

export default connect(null, mapDispatchToProps)(AddBlogForm);
