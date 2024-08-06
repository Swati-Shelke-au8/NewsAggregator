// ArticleCard.js
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
    </div>
  );
};

export default ArticleCard;
