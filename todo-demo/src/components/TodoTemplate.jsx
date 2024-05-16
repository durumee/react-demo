import styles from "./TodoTemplate.module.css";

const TodoTemplate = (props) => {
  return (
    <div className={styles.TodoTemplate}>
      <div className={styles.title}>일정 관리</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default TodoTemplate;
