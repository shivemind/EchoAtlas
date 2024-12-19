import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await axios.get('http://localhost:5000/api/articles', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setArticles(data);
        };

        fetchArticles();
    }, []);

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/articles/${id}`, {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setArticles(articles.filter((article) => article._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article._id}>
                        <h3>{article.title}</h3>
                        <button onClick={() => deleteArticle(article._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
