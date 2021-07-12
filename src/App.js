import "./App.css";

function App() {
  function handleSubmit(event) {
    let text = event.currentTarget["new-item-input"].value.trim();

    event.preventDefault();

    if (!text) {
      return alert("Can't add blank todos...");
    }

    alert(`New todo submitted: ${event.currentTarget["new-item-input"].value}`);
    event.currentTarget.reset();
  }

  let todoItems = [
    "Learn React",
    "Join Lunch Dev Discord",
    "Listen to React Podcast",
  ].map((item) => (
    <li>
      <span>{item}</span>
      <button type="button">✏️</button>
      <button type="button">🗑</button>
    </li>
  ));

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-item-input">New Todo</label>
        <input type="text" id="new-item-input" autoFocus={100} />
        <button type="submit">Add Todo</button>
      </form>

      <ul>{todoItems}</ul>
    </main>
  );
}

export default App;
