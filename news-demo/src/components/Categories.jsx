import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = (props) => {
  return (
    <div className={styles.block}>
      {props.categories.map((c) => (
        <Link
          key={c.name}
          to={c.name === "all" ? "/" : `/${c.name}`}
          className={styles.category}
        >
          {c.text}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
