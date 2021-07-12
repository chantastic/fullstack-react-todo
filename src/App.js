import * as React from "react";
import "./App.css";

function App() {
  let [todoItems, updateTodoItems] = React.useState([
    { id: 100, name: "Learn React" },
    { id: 101, name: "Join Lunch Dev Discord" },
    { id: 102, name: "Listen to React Podcast" },
  ]);

  let todoItemElements = todoItems.map((item) => (
    <li key={item.id}>
      <span>{item.name}</span>
      <button type="button">✏️</button>
      <button type="button">🗑</button>
    </li>
  ));

  function handleSubmit(event) {
    let text = event.currentTarget["new-item-input"].value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    alert(`New todo submitted: ${event.currentTarget["new-item-input"].value}`);
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

      <button type="button" onClick={() => updateTodoItems([])}>
        obliterate state
      </button>
    </main>
  );
}

export default App;
