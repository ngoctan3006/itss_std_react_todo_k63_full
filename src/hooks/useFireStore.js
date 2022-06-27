import { useState } from 'react';
import { addItem, clearItem, getItems, updateItem } from '../firebase/service';

const useFirestore = (collection, condition) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const items = await getItems();
    setTodos(items);
  };

  const addTodo = async (item) => {
    await addItem(item);
    setTodos([...todos, item]);
  };

  const updateTodo = async (item) => {
    const changes = { done: !item.done };
    const newTodos = todos.map((el) => (el.id === item.id ? { ...item, ...changes } : el));
    setTodos(newTodos);
    await updateItem(changes, item.id);
  };

  const clear = () => {
    todos.forEach((item) => {
      clearItem(item);
    });
    setTodos([]);
  };

  return { todos, getTodos, addTodo, updateTodo, clear };
};

export default useFirestore;
