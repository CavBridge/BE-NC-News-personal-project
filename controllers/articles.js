const {
  fetchArticlesById,
  patchArticleVotes,
  fetchArticles,
  fetchArticleCommentsById,
  insertComment,
  removeCommentById,
} = require("../models/articles");

exports.getArticlesAndId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article: article[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then((articles) => res.status(200).send({ articles }))
    .catch(next);
};

exports.getArticleCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then(() => {
      return fetchArticleCommentsById(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  fetchArticlesById(article_id)
    .then(() => {
      return insertComment(article_id, body);
    })
    .then((comment) => res.status(201).send({ comment }))
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
