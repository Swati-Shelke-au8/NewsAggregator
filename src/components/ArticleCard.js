import React from "react";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="article-image"
        />
      )}
      <h2 className="article-title">{article.title}</h2>
      <p className="article-description">{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      <div className="article-date-and-author">
        <p className="article-description">
          <span className="article-date">Published at : </span>
          {new Date(article.date).toLocaleDateString()}
        </p>
        <p className="article-description">
          <span className="article-date">Author : </span>
          {article.author}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
