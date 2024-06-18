import { useParams } from "react-router";
import NewsList from "./NewsList";
import { useEffect, useState } from "react";
const VITE_NEWSAPI_KEYS = import.meta.env.VITE_NEWSAPI_KEYS;
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? '/api/'
  : 'https://newsapi.org/';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");
  const param = useParams();
  const path = param["*"] || "all";
  if (path != category) {
    setCategory(path);
  }

  useEffect(() => {
    const fetchData = async () => {
      const query = path == "all" ? "" : `&category=${path}`;
      const data = await fetch(
        `${API_BASE_URL}v2/top-headlines?country=kr&apiKey=${VITE_NEWSAPI_KEYS}${query}`
      );
      const response = await data.json();
      setArticles(response.articles);
    };

    fetchData();
  }, [category]);

  return (
    <>
      <NewsList articles={articles} />
    </>
  );
};

export default NewsPage;
