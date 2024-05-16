import NewsItem from "./NewsItem";
import styles from "./NewsList.module.css";

const NewsList = (props) => {
  return (
    <div className={styles.block}>
      {props.articles.map((article, index) => {
        return <NewsItem key={index} article={article} />;
      })}
    </div>
  );
};

export default NewsList;
