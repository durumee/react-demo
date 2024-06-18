import { useParams } from "react-router";
import NewsList from "./NewsList";
import { useEffect, useState } from "react";
const VITE_GNEWS_API_KEYS = import.meta.env.VITE_GNEWS_API_KEYS;

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
      const query = `&category=${path}`;
      const data = await fetch(
        `https://gnews.io/api/v4/top-headlines?apikey=${VITE_GNEWS_API_KEYS}${query}`
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
