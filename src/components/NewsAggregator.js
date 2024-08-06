import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import "../App.css";
import { Stack, Pagination } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArticleCarousel from "./ArticleCarousel";

const NewsAggregator = ({ query, date, author, category, source }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 9;

  const limitedDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const fetchFromNewsAPI = async (params) => {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        ...params,
        q: query || "news",
        apiKey: "2e2a53e7470f48cba452622c29eaeeaf",
        category:
          category !== "All Categories" ? category.toLowerCase() : undefined,
      },
    });
    return response.data.articles.map((article) => ({
      title: article.title,
      url: article.url,
      image:
        article.urlToImage ||
        "https://img.freepik.com/premium-photo/man-reading-newspaper-cropped-view_1139106-1801.jpg?w=826",
      description: limitedDescription(
        article.description || "No description available.",
        20
      ),
      source: "NewsAPI",
      date: article.publishedAt,
      author: article.author || "Unknown",
    }));
  };

  const fetchFromGuardianAPI = async (params) => {
    const response = await axios.get(
      "https://content.guardianapis.com/search",
      {
        params: {
          ...params,
          "api-key": "10dd4545-0367-49a0-917d-3b687bff2bc1",
          "show-fields": "thumbnail,bodyText,byline",
          page: params.page,
          "page-size": params.pageSize,
          section:
            category !== "All Categories" ? category.toLowerCase() : undefined,
        },
      }
    );
    return response.data.response.results.map((article) => ({
      title: article.webTitle,
      url: article.webUrl,
      image:
        article.fields?.thumbnail ||
        "https://img.freepik.com/premium-photo/man-reading-newspaper-cropped-view_1139106-1801.jpg?w=826",
      description: limitedDescription(
        article.fields?.bodyText || "No description available.",
        20
      ),
      source: "The Guardian",
      date: article.webPublicationDate,
      author: article.fields?.byline || "Unknown",
    }));
  };

  const fetchFromNYTAPI = async (params) => {
    const response = await axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      {
        params: {
          ...params,
          "api-key": "5uVzhBFig3gn0sRpObdDLtDGt3qAzRuY",
          fq:
            category !== "All Categories"
              ? `news_desk:${category.toLowerCase()}`
              : undefined,
        },
      }
    );
    return response.data.response.docs.map((article) => ({
      title: article.headline.main,
      url: article.web_url,
      image:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "https://img.freepik.com/premium-photo/man-reading-newspaper-cropped-view_1139106-1801.jpg?w=826",
      description: limitedDescription(
        article.snippet || "No description available.",
        20
      ),
      source: "NYT",
      date: article.pub_date,
      author: article.byline?.original || "Unknown",
    }));
  };

  const filterByDate = (articles) => {
    if (!date) return articles;
    return articles.filter((article) => {
      const articleDate = new Date(article.date);
      const filterDate = new Date(date);
      return articleDate.toDateString() === filterDate.toDateString();
    });
  };

  const filterByAuthor = (articles) => {
    if (!author) return articles;
    return articles.filter((article) =>
      article.author.toLowerCase().includes(author.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = {
          page: page,
          pageSize: pageSize,
          from: date || undefined,
          to: date || undefined,
        };

        if (query) {
          params.q = query;
        }
        if (category !== "All Categories") {
          params.category = category.toLowerCase();
        }

        let articlesFromAPI = [];
        let totalResults = 0;

        if (source === "the-guardian") {
          articlesFromAPI = await fetchFromGuardianAPI(params);
          totalResults = articlesFromAPI.length;
        } else if (source === "nyt") {
          articlesFromAPI = await fetchFromNYTAPI(params);
          totalResults = articlesFromAPI.length;
        } else if (source === "bbc-news") {
          articlesFromAPI = await fetchFromNewsAPI(params);
          totalResults = articlesFromAPI.length;
        } else {
          const [guardianArticles, nytArticles] = await Promise.all([
            fetchFromGuardianAPI(params),
            fetchFromNYTAPI(params),
          ]);
          articlesFromAPI = [...guardianArticles, ...nytArticles];
          // eslint-disable-next-line no-unused-vars
          totalResults = articlesFromAPI.length;
        }

        let filteredArticles = articlesFromAPI.filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        );

        filteredArticles = filterByDate(filteredArticles);
        filteredArticles = filterByAuthor(filteredArticles);

        setArticles(filteredArticles);
        setTotalResults(filteredArticles.length);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      setLoading(false);
    };

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, author, date, category, source, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="news-aggregator">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Carousel>
              {articles.map((article, index) => (
                <ArticleCarousel key={index} article={article} />
              ))}
            </Carousel>
          </div>
          <div className="article-list">
            {articles.length > 0 ? (
              articles
                .slice((page - 1) * pageSize, page * pageSize)
                .map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
          <div className="pagination-controls">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(totalResults / pageSize)}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsAggregator;
