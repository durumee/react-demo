// This project uses react-icons, which is licensed under the MIT License.
// See https://github.com/react-icons/react-icons/blob/master/LICENSE for more information.
import { MdAdd } from "react-icons/md";
import styles from "./TodoInsert.module.css";
import { useCallback, useState } from "react";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <form
      className={styles.TodoInsert}
      onSubmit={(e) => {
        e.preventDefault();
        onInsert(value);
      }}
    >
      <input
        className={styles.input}
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />

      <button type="submit" className={styles.button}>
        <MdAdd />
      </button>
    </form>
  );
};
export default TodoInsert;
