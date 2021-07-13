import * as React from "react";
import useAriaAnnounce from "./modules/use-aria-announce";
import useEditingId from "./modules/use-editing-id";
import { todosReducer } from "./modules/todo";
import "./App.css";

function createTodoItem(title) {
  return { id: Date.now(), title };
}

function App() {
  let [todoItems, dispatchTodoAction] = React.useReducer(todosReducer, []);
  let [editingId, dispatchEditingAction] = useEditingId();
  let [announcement, announce, PoliteAnnouncement] = useAriaAnnounce();

  function announceMiddleware(dispatch) {
    return (action) => {
      switch (action.type) {
        case "APPEND_CREATE":
          announce("Todo added!");
          dispatch(action);
          break;
        case "DELETE":
          announce(`Todo deleted.`);
          dispatch(action);
          break;
        case "UPDATE":
          dispatchEditingAction({ type: "CONCLUDE_EDITING" });
          announce(`Todo updated!`);
          dispatch(action);
          break;
        default:
          break;
      }
    };
  }

  let dispatchComposedTodoAction = announceMiddleware(dispatchTodoAction);

  function handleNewTodoItemSubmit(event) {
    let text = event.currentTarget.newTodo_title.value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    dispatchComposedTodoAction({
      type: "APPEND_CREATE",
      payload: createTodoItem(text),
    });

    event.currentTarget.reset();
  }

  function handleEditTodoItemSubmit(event, itemId) {
    event.preventDefault();
    dispatchComposedTodoAction({
      type: "UPDATE",
      payload: { id: itemId, text: event.currentTarget.editTodo_title.value },
    });
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
          <button
            type="button"
            onClick={() =>
              dispatchComposedTodoAction({
                type: "DELETE",
                payload: item.id,
              })
            }
          >
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
        <button
          type="button"
          onClick={() => {
            announce("All todos removed.");
            dispatchTodoAction({ type: "DEBUG:CLEAR" });
          }}
        >
          CLEAR
        </button>
        <button
          type="button"
          onClick={() => {
            announce("Todo list replaced with sample data.");
            dispatchTodoAction({ type: "DEBUG:SEED" });
          }}
        >
          SEED
        </button>
      </main>
    </div>
  );
}

export default App;
