import * as React from "react";
import "./App.css";

function App() {
  let [todoItems, updateTodoItems] = React.useState([]);
  let [editingId, editTodoWithId] = React.useState(-1);

  let todoItemElements = todoItems.map((item) => (
    <li key={item.id}>
      {editingId === item.id ? (
        <React.Fragment>
          <form onSubmit={(event) => handleItemEditingSubmit(event, editingId)}>
            <label htmlFor="edit-todo-input">
              (should i visually hide this?)
            </label>
            <input type="text" defaultValue={item.title} id="edit-todo-input" />

            <button type="submit">
              <span role="img" aria-label="complete edit">
                ✅
              </span>
            </button>

            <button type="button" onClick={() => concludeEditing()}>
              <span role="img" aria-label="cancel edit">
                ❌
              </span>
            </button>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>{item.title}</span>
          <button type="button" onClick={() => editTodoWithId(item.id)}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button type="button" onClick={() => deleteTodoItemWithId(item.id)}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </React.Fragment>
      )}
    </li>
  ));

  function addTodoItem(title) {
    return updateTodoItems([...todoItems, { id: Date.now(), title: title }]);
  }

  function deleteTodoItemWithId(id) {
    return updateTodoItems(todoItems.filter((item) => item.id !== id));
  }

  function concludeEditing() {
    editTodoWithId(-1);
  }

  function updateTodoItemWithId(id, text) {
    concludeEditing();
    return updateTodoItems(
      todoItems.reduce(
        (items, item) => [
          ...items,
          id === item.id ? { ...item, title: text } : item,
        ],
        []
      )
    );
  }

  function handleItemEditingSubmit(event, itemId) {
    event.preventDefault();
    updateTodoItemWithId(itemId, event.currentTarget["edit-todo-input"].value);
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
