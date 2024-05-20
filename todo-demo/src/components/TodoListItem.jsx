// This project uses react-icons, which is licensed under the MIT License.
// See https://github.com/react-icons/react-icons/blob/master/LICENSE for more information.
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
