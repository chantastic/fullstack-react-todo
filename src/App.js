import * as React from "react";
import "./App.css";

function App() {
  let [todoItems, updateTodoItems] = React.useState([]);

  let todoItemElements = todoItems.map(({ id, title }) => (
    <li key={id}>
      <span>{title}</span>
      <button type="button">✏️</button>
      <button type="button" onClick={() => deleteTodoItemById(id)}>
        🗑
      </button>
    </li>
  ));

  function addTodoItem(title) {
    return updateTodoItems([...todoItems, { id: Date.now(), title: title }]);
  }

  function deleteTodoItemById(id) {
    console.log(id);
    return updateTodoItems(todoItems.filter((item) => item.id !== id));
  }

  function handleSubmit(event) {
    let text = event.currentTarget["new-item-input"].value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    addTodoItem(text);
    event.currentTarget.reset();
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-item-input">New Todo</label>
        <input type="text" id="new-item-input" autoFocus={100} />
        <button type="submit">Add Todo</button>
      </form>

      <ul>{todoItemElements}</ul>

      <h2>Debugging</h2>
      <button type="button" onClick={() => updateTodoItems([])}>
        obliterate state
      </button>
      <button
        type="button"
        onClick={() =>
          updateTodoItems([
            { id: 100, title: "Learn React" },
            { id: 101, title: "Join Lunch Dev Discord" },
            { id: 102, title: "Listen to React Podcast" },
          ])
        }
      >
        seed state
      </button>
    </main>
  );
}

export default App;
