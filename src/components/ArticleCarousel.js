// ArticleCard.js
import React from "react";
import "./ArticleCarousel.css";
import { Grid } from "@mui/material";

const ArticleCarousel = ({ article }) => {
  return (
    <div className="article-carousel">
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} sm={8} md={8}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="article-carousel-image"
            />
          )}{" "}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <div>
            <h2 className="article-carousel-title">{article.title}</h2>
            <p className="article-carousel-description">
              {article.description}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ArticleCarousel;
