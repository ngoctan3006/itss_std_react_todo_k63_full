import { useEffect, useState } from 'react';
import { addItem, clearItem, getItems, updateItem } from '../firebase/service';

const useFirestore = (collection, condition) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getTodos = async () => {
    const items = await getItems();
    setTodos(items);
  };

  const addTodo = async (item) => {
    const newTodo = { text: item.text, done: item.done };
    await addItem(newTodo);
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (checked) => {
    const changes = { done: !checked.done };
    await updateItem(changes, checked.id);
    const newItems = todos.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes };
      }
      return item;
    });
    setTodos(newItems);
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
