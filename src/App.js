import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import NewsAggregator from "./components/NewsAggregator";
import { TextField, MenuItem } from "@mui/material";

function App(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [source, setSource] = useState("All Sources");

  const Categories = [
    { value: "All Categories", label: "All Categories" },
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Business", label: "Business" },
    { value: "Science", label: "Science" },
    { value: "Entertainment", label: "Entertainment" },
  ];

  const Sources = [
    { value: "All Sources", label: "All Sources" },
    { value: "bbc-news", label: "BBC-News" },
    { value: "nyt", label: "New York Times" },
    { value: "the-guardian", label: "The Guardian" },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar className="news-navbar">
          <Typography variant="h6" component="h3">
            News Aggregator
          </Typography>
          <div className="news-fields">
            <TextField
              id="filled-search"
              className="filled-search"
              placeholder="Search articles"
              variant="standard"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ ml: 2, mr: 2 }}
            />
            <TextField
              id="outlined-select-Categories"
              className="outlined-select-Categories"
              select
              label=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ ml: 2, mr: 2 }}
              variant="standard"
            >
              {Categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-Sources"
              className="outlined-select-Sources"
              select
              label=""
              value={source}
              onChange={(e) => setSource(e.target.value)}
              sx={{ ml: 2 }}
              variant="standard"
            >
              {Sources.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
          <NewsAggregator query={query} category={category} source={source} />
        </Box>
      </Container>
      <Fade in={trigger}>
        <Box role="presentation">{children}</Box>
      </Fade>
      <Fab
        className="scroll-back-to-top"
        size="small"
        aria-label="scroll back to top"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </React.Fragment>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default App;
