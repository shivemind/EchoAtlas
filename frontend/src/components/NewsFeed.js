import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const { data } = await fetchArticles();
            setArticles(data);
        };
        getArticles();
    }, []);

    return (
        <div>
            {articles.map((article) => (
                <div key={article._id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    {article.media.map((url, index) => (
                        <img key={index} src={url} alt="media" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
