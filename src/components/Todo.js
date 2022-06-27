import { useEffect, useState } from 'react';

/* コンポーネント */
import Filter from './Filter';
import Input from './Input';
import TodoItem from './TodoItem';

/* カスタムフック */
import useFirestore from '../hooks/useFireStore';

/* ライブラリ */
import { getKey } from '../lib/util';

function Todo() {
  const { todos, getTodos, addTodo, updateTodo, clear } = useFirestore();
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getTodos();
  }, []);

  const displayTodos = todos.filter((item) => {
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
    return true;
  });

  const handleCheck = (item) => {
    updateTodo(item);
  };

  const handleAdd = (text) => {
    addTodo({ key: getKey(), text, done: false });
  };

  const handleFilterChange = (value) => setFilter(value);

  return (
    <div className="container is-fluid">
      <article className="panel is-danger">
        <div className="panel-heading">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-calendar-check"></i>
            </span>
            <span> ITSS Todoアプリ</span>
          </span>
        </div>
        <Input onAdd={handleAdd} />
        <Filter onChange={handleFilterChange} value={filter} />
        {displayTodos.map((item) => (
          <TodoItem key={item.key} item={item} onCheck={handleCheck} />
        ))}
        <div className="panel-block">{displayTodos.length} items</div>
        <div className="panel-block">
          <button className="button is-light is-fullwidth" onClick={clear}>
            全てのToDoを削除
          </button>
        </div>
      </article>
    </div>
  );
}

export default Todo;
