import React, { useState } from 'react';

/* コンポーネント */
import Filter from './Filter';
import Input from './Input';
import TodoItem from './TodoItem';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import { getKey } from '../lib/util';

function Todo() {
  const [items, putItems, clearItems] = useStorage();
  const [filter, setFilter] = useState('ALL');

  const displayItems = items.filter((item) => {
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
    return true;
  });

  const handleCheck = (checked) => {
    const newItems = items.map((item) => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    putItems(newItems);
  };

  const handleAdd = (text) => {
    putItems([...items, { key: getKey(), text, done: false }]);
  };

  const handleFilterChange = (value) => setFilter(value);

  return (
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
      {displayItems.map((item) => (
        <TodoItem key={item.key} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">{displayItems.length} items</div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;
