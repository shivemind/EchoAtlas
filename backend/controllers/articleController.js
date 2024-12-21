const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Number of articles per page
        const skip = (page - 1) * limit;

        const articles = await Article.find().skip(skip).limit(limit);
        const totalArticles = await Article.countDocuments();

        res.status(200).json({
            articles,
            hasMore: skip + limit < totalArticles, // Check if there are more articles
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add this function to handle article deletion
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params; // Get the article ID from the route parameters
        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully', deletedArticle });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
