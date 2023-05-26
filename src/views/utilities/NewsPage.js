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
import { addNews, deleteNews, editNews, getAllNews } from 'store/actions/news';
import NewsCard from 'components/cards/NewsCard';

const initFormData = {
    title: '',
    link: '',
    image: '',
    isPublic: true
};

const initState = { loading: false, error: null };

const NewsPage = ({ news, getNews, addNews, editNews, deleteNews }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [formData, setFormData] = useState(initFormData);
    const [state, setState] = useState(initState);
    const [currentNews, setCurrentNews] = useState(null);

    const { data, isError, isLoading } = useFetcher('/news?all=true&limit=16');

    useEffect(() => {
        if (data?.data?.length) {
            getNews({ news: data?.data });
        }
    }, [data?.data?.length]);

    useEffect(() => {
        if (currentNews) {
            setFormData({
                image: currentNews.image,
                title: currentNews.title,
                link: currentNews.link,
                isPublic: currentNews.isPublic
            });
        } else {
            setFormData(initFormData);
        }
    }, [currentNews]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setState(initState);
        try {
            setState((prev) => ({ ...prev, loading: true }));
            if (currentNews) {
                const newObj = compareObj(currentNews, formData);
                if (!Object.keys(newObj).length) {
                    toast.error('No changes made', { position: 'top-right' });
                    return;
                }
                const result = await toast.promise(
                    API.patch(`/news/update?id=${currentNews._id}`, newObj),
                    {
                        loading: `Updating news, please wait...`,
                        success: `News ${currentNews.title} updated successfully!`,
                        error: `Something went wrong while updating news`
                    },
                    { position: 'top-right' }
                );
                editNews(result.data.data);
                setCurrentNews(null);
            } else {
                const result = await toast.promise(
                    API.post(`/news/create`, formData),
                    {
                        loading: `Adding news, please wait...`,
                        success: `News added successfully!`,
                        error: `Something went wrong while adding news`
                    },
                    { position: 'top-right' }
                );
                addNews(result.data.data);
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
        setCurrentNews(null);
        setState(initState);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentNews(null);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Cathedral's News</Typography>
                <Sidebar
                    title={currentNews ? 'Update News' : 'Add News'}
                    openSidebar={openSidebar}
                    onOpenSidebar={() => {
                        setCurrentNews(null);
                        handleOpenSidebar();
                    }}
                    onCloseSidebar={handleCloseSidebar}
                    handleSubmit={handleSubmit}
                    state={state}
                >
                    <TextField
                        label="Title"
                        color="secondary"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Link URL"
                        color="secondary"
                        value={formData.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                        fullWidth
                        required
                    />

                    <ChooseFileImage
                        selected={formData.image}
                        title="Featured Image"
                        onSelect={(selected) => handleChange('image', selected)}
                    />

                    <IosSwitch value={formData.isPublic} onChange={(value) => handleChange('isPublic', value)} label="Is Public" />
                </Sidebar>
            </Stack>
            <DataWidget
                title="News"
                isLoading={isLoading && !news.length}
                isError={isError}
                isEmpty={!news.length}
                customLoaders={<ProjectsLoaders />}
            >
                <Grid container spacing={3} sx={{ my: 1 }}>
                    {news.map((newsA, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <NewsCard
                                    news={newsA}
                                    isActive={currentNews?._id === newsA._id}
                                    onClick={(action) => {
                                        setCurrentNews(newsA);
                                        action === 'edit' ? handleOpenSidebar() : handleOpenModal();
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DataWidget>
            <ModalDialog
                title="Delete News?"
                subTitle={`Are you sure do you want to delete this news? `}
                item={currentNews?.title}
                open={openModal}
                handleClose={handleCloseModal}
                handleClickOk={async () => {
                    const id = currentNews?._id;
                    const title = currentNews?.title;
                    setOpenModal(false);
                    try {
                        await toast.promise(API.delete(`/news/delete?id=${id}`), {
                            loading: `Hold on, we are deleting ${title} from our system.`,
                            success: `News ${title} has been deleted successfully`,
                            error: (error) => {
                                if (error.response) {
                                    return `Error: ${error.response?.data?.message || error.message || 'Unknown error occured'}`;
                                } else {
                                    return 'Something went wrong while deleting news, please try again';
                                }
                            }
                        });
                        deleteNews(id);
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
    news: state.news.news
});

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: (data) => dispatch(getAllNews(data)),
        addNews: (data) => dispatch(addNews(data)),
        deleteNews: (id) => dispatch(deleteNews(id)),
        editNews: (data) => dispatch(editNews(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
