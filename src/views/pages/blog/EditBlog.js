import { API, useFetcher } from 'api';
import DataWidget from 'components/Global/DataWidget';
import AddBlogForm from 'components/blog/AddBlogForm';
import { useMemo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const initState = { loading: true, error: null };

const EditBlog = () => {
    const { slug } = useParams();
    const [state, setState] = useState(initState);
    const [currentBlog, setCurrentBlog] = useState(null);

    const getBlog = useCallback(async (slug) => {
        try {
            setState((prev) => ({ ...prev, loading: true }));
            const result = await API.get('/blog/getSinglePost?slug=' + slug);
            setCurrentBlog(result.data?.data);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || error.message || 'Unknown error occured, please try again.'
            }));
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    });

    useMemo(() => {
        getBlog(slug);
    }, [slug]);

    return (
        <DataWidget title="Blog details" isError={state.error} isLoading={state.loading}>
            <AddBlogForm currentBlog={currentBlog} />
        </DataWidget>
    );
};

export default EditBlog;
