import styles from "./NewsItem.module.css";

const NewsItem = (props) => {
  return (
    <div className={styles.block}>
      <div className={styles.thumbnail}>
        <a href={props.article.url} target="_blank">
          <img src={props.article.urlToImage} alt="관련 이미지" />
        </a>
      </div>
      <div className={styles.contents}>
        <h2>
          <a href={props.article.url} target="_blank">
            {props.article.title}
          </a>
        </h2>
        <p>{props.article.description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
