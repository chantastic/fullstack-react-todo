import * as React from "react";
import "./App.css";

let visuallyHidden = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

function App() {
  let [todoItems, updateTodoItems] = React.useState([]);
  let [editingId, editTodoWithId] = React.useState(-1);
  // let [announcement, announce] = React.useState("");
  let [announcement, setAnnouncement] = React.useState(<span />);

  function announce(announcement) {
    setAnnouncement(
      <span>
        {announcement}
        <span aria-hidden>{Date.now()}</span>
      </span>
    );
  }

  // todo state functions
  function addTodoItem(title) {
    announce("Todo updated!");
    return updateTodoItems([...todoItems, { id: Date.now(), title: title }]);
  }

  function deleteTodoItemWithId(id) {
    let todo = todoItems.find((item) => item.id === id);
    // we have a problem. the confirm interrupts the live region
    // might need to set a tab focus first?
    // if (window.confirm(`Are you sure you want to delete todo: ${todo.title}`)) {
    announce(`Todo '${todo.title}' has been deleted.`);
    return updateTodoItems(todoItems.filter((item) => item.id !== id));
    // }
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

  // editing state functions
  function concludeEditing() {
    editTodoWithId(-1);
  }

  // form handler functions
  function handleNewTodoItemSubmit(event) {
    let text = event.currentTarget.newTodo_title.value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    addTodoItem(text);
    announce(<span>Todo added!</span>);
    // announce(`Todo added: ${text}`);
    event.currentTarget.reset();
  }

  function handleEditTodoItemSubmit(event, itemId) {
    event.preventDefault();
    updateTodoItemWithId(itemId, event.currentTarget.editTodo_title.value);
  }

  let todoItemElements = todoItems.map((item) => (
    <li key={item.id}>
      {editingId === item.id ? (
        <React.Fragment>
          <form
            onSubmit={(event) => handleEditTodoItemSubmit(event, editingId)}
          >
            <label htmlFor="editTodo_title">
              (should i visually hide this?)
            </label>
            <input type="text" defaultValue={item.title} id="editTodo_title" />

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

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <header>
        <span
          style={{
            display: "flex",
            fontWeight: "800",
            fontSize: "2rem",
            marginBlockEnd: "1rem",
          }}
        >
          Better React Todo
        </span>
      </header>
      <main>
        <form onSubmit={handleNewTodoItemSubmit}>
          <label htmlFor="newTodo_title">New Todo</label>
          <input type="text" id="newTodo_title" autoFocus={100} />
          <button type="submit">Add Todo</button>
        </form>

        <ul>{todoItemElements}</ul>

        <div role="status" aria-live="polite" style={visuallyHidden}>
          {announcement}
        </div>

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
    </div>
  );
}

export default App;
