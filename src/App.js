import * as React from "react";
import useAriaAnnounce from "./modules/use-aria-announce";
import useEditingId from "./modules/use-editing-id";
import "./App.css";

function App() {
  let [todoItems, dispatchTodoAction] = React.useReducer(
    (_, actionOrNextTodos) => {
      if (Array.isArray(actionOrNextTodos)) return actionOrNextTodos;
    },
    []
  );
  let [editingId, dispatchEditingAction] = useEditingId();
  let [announcement, announce, PoliteAnnouncement] = useAriaAnnounce();

  function addTodoItem(title) {
    announce("Todo added!");
    return dispatchTodoAction([...todoItems, { id: Date.now(), title: title }]);
  }

  function deleteTodoItemWithId(id) {
    let todo = todoItems.find((item) => item.id === id);
    // we have a problem. the confirm interrupts the live region
    // might need to set a tab focus first?
    // if (window.confirm(`Are you sure you want to delete todo: ${todo.title}`)) {
    announce(`Todo '${todo.title}' has been deleted.`);
    return dispatchTodoAction(todoItems.filter((item) => item.id !== id));
    // }
  }

  function updateTodoItemWithId(id, text) {
    dispatchEditingAction({ type: "CONCLUDE_EDITING" });
    announce(`Todo updated!`);
    return dispatchTodoAction(
      todoItems.reduce(
        (items, item) => [
          ...items,
          id === item.id ? { ...item, title: text } : item,
        ],
        []
      )
    );
  }

  // form handler functions
  function handleNewTodoItemSubmit(event) {
    let text = event.currentTarget.newTodo_title.value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    addTodoItem(text);
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
            <input
              aria-label="Edit todo"
              type="text"
              defaultValue={item.title}
              id="editTodo_title"
              autoFocus
            />

            <button type="submit">
              <span role="img" aria-label="complete edit">
                ✅
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                dispatchEditingAction({ type: "CONCLUDE_EDITING" })
              }
            >
              <span role="img" aria-label="cancel edit">
                ❌
              </span>
            </button>
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>{item.title}</span>
          <button
            type="button"
            onClick={() =>
              dispatchEditingAction({ type: "SET_EDITING_ID", id: item.id })
            }
          >
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

        <PoliteAnnouncement
          as={"strong"}
          style={(vh) => ({
            ...vh,
            color: "red",
          })}
        >
          {announcement}
        </PoliteAnnouncement>

        <h2>Debugging</h2>
        <button type="button" onClick={() => dispatchTodoAction([])}>
          obliterate state
        </button>
        <button
          type="button"
          onClick={() =>
            dispatchTodoAction([
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
