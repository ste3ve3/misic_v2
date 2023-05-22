import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    TextField,
    Typography,
    styled
} from '@mui/material';
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
import { addBlog, deleteBlog, editBlog, getAllBlogs } from 'store/actions/blog';
import BlogsLoaders from 'components/cards/Skeleton/BlogsLoaders';
import { IconCirclePlus, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons';
import dayjs from 'dayjs';
import { compareObj } from 'utils/constants';
import { useNavigate } from 'react-router';

const CustomTypography = styled(Typography)`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const initFormData = {
    title: '',
    postDescription: '',
    postBody: '',
    postImage: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const BlogsPage = ({ blogs, paginationDetails, getBlogs, addBlog, editBlog, deleteBlog }) => {
    const [currentBlog, setCurrentBlog] = useState(null);

    const { data, isError, isLoading } = useFetcher('/blog?all=admin&perPage=12');

    useEffect(() => {
        if (data?.data?.length && !blogs.length) {
            getBlogs({ blogs: data?.data, paginationDetails: data?.paginationDetails });
        }
    }, [data?.data?.length]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentBlog(null);
    };

    const [openMenu, setOpenMenu] = useState(null);

    const handleOpenMenu = (e) => {
        setOpenMenu(e.target);
    };
    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const nav = useNavigate();

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Cathedral's Blogs</Typography>
                <Button
                    sx={{ mt: 2 }}
                    onClick={() => nav('/content/blogs/new')}
                    variant="outlined"
                    startIcon={<IconCirclePlus />}
                    color="secondary"
                >
                    New Blog
                </Button>
            </Stack>
            <DataWidget
                title="Blogs"
                isLoading={isLoading && !blogs.length}
                isError={isError && !blogs.length}
                isEmpty={!blogs.length}
                customLoaders={<BlogsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {blogs.map((blog, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <Card sx={{ width: '100%', p: 0 }}>
                                    <CardHeader
                                        avatar={<Avatar alt={blog.postCreator?.names} src={blog.postCreator?.picture?.url} />}
                                        action={
                                            <IconButton
                                                aria-label="settings"
                                                onClick={(e) => {
                                                    handleOpenMenu(e);
                                                    setCurrentBlog(blog);
                                                }}
                                            >
                                                <IconDotsVertical size={15} />
                                            </IconButton>
                                        }
                                        title={<CustomTypography>{blog.postCreator?.names}</CustomTypography>}
                                        subheader={<CustomTypography sx={{ fontSize: 12 }}>{blog.createdAt}</CustomTypography>}
                                        sx={{ px: 2, py: 1 }}
                                    />
                                    <CardMedia component="img" height="200" image={blog.postImage} alt={blog.title} />
                                </Card>
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" color="text.secondary" component="p">
                                        {blog.title}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete Blog?"
                subTitle={`Are you sure do you want to delete this blog? `}
                item={currentBlog?.title}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentBlog?._id;
                    const title = currentBlog?.title;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/blog/deletePost/${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `Blog ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting blog, please try again';
                                }
                            }
                        });
                        deleteBlog(id);
                    } catch (error) {
                    } finally {
                        handleCloseModal();
                    }
                }}
            />
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
                        handleCloseMenu();
                        nav('/content/blogs/edit/' + currentBlog?.slug);
                    }}
                >
                    <IconEdit />
                    <Typography sx={{ pl: 2 }}>Edit</Typography>
                </MenuItem>
                <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                        handleOpenModal();
                        handleCloseMenu();
                    }}
                >
                    <IconTrash />
                    <Typography sx={{ pl: 2 }}>Delete</Typography>
                </MenuItem>
            </Popover>
        </div>
    );
};

const mapStateToProps = (state) => ({
    blogs: state.blog.blogs,
    paginationDetails: state.blog.paginationDetails
});

const mapDispatchToProps = (dispatch) => {
    return {
        getBlogs: (data) => dispatch(getAllBlogs(data)),
        addBlog: (data) => dispatch(addBlog(data)),
        deleteBlog: (id) => dispatch(deleteBlog(id)),
        editBlog: (data) => dispatch(editBlog(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);
