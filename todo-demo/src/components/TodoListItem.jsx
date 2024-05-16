import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
  const { id, text, checked } = props.todo;

  return (
    <div className={styles.TodoListItem}>
      <div
        className={
          checked ? `${styles.checkbox} ${styles.checked}` : styles.checkbox
        }
        onClick={() => props.onToggle(id)}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className={styles.text}>{text}</div>
      </div>

      <div
        className={styles.remove}
        onClick={() => {
          props.onRemove(id);
        }}
      >
        <MdRemoveCircleOutline></MdRemoveCircleOutline>
      </div>
    </div>
  );
};
export default TodoListItem;
