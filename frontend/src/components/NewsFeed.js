import React, { useEffect, useState, useCallback } from 'react';
import { fetchArticles } from '../api';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getArticles = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const { data } = await fetchArticles(page);
            console.log('Fetched Articles:', data.articles); // Log fetched articles
            setArticles((prev) => [...prev, ...data.articles]);
            setHasMore(data.hasMore);
        } catch (err) {
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    }, [page, loading]);

    useEffect(() => {
        getArticles();
    }, [page, getArticles]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        }
    }, [hasMore, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div>
            {articles.map((article, index) => (
                <div key={`${article._id}-${index}`} style={{ marginBottom: '20px' }}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    {article.media && article.media.length > 0 ? (
                        article.media.map((url, mediaIndex) => (
                            <img
                                key={`${article._id}-media-${mediaIndex}`}
                                src={url}
                                alt="media"
                                style={{ maxWidth: '100%', display: 'block', margin: '10px 0' }}
                            />
                        ))
                    ) : (
                        <p>No media available</p>
                    )}
                </div>
            ))}
            {loading && <p>Loading more articles...</p>}
            {!hasMore && <p>No more articles to load.</p>}
        </div>
    );
};

export default NewsFeed;
