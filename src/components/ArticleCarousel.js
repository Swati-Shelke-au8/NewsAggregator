import React from "react";
import "./ArticleCarousel.css";
import { Grid, Box } from "@mui/material";

const ArticleCarousel = ({ article }) => {
  return (
    <div className="article-carousel">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className="article-carousel-grid">
          <Grid item xs={12} sm={12} md={8} lg={8}>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="article-carousel-image"
              />
            )}{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} className="carousel-image">
            <div>
              <h2 className="article-carousel-title">{article.title}</h2>
              <p className="article-carousel-description">
                {article.description}
              </p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ArticleCarousel;
