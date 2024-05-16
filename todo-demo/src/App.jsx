import { useCallback, useRef, useState } from "react";
import "./App.css";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트의 기초 알아보기", checked: true },
    { id: 2, text: "컴포넌트 스타일링해 보기", checked: true },
    { id: 3, text: "일정 관리 앱 만들어 보기", checked: false },
  ]);

  const nextId = useRef(todos.length + 1);

  const onInsert = (text) => {
    const todo = { id: nextId.current, text: text, checked: false };
    const new_todos = [...todos, todo];
    setTodos(new_todos);
    nextId.current++;
  };

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;