import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          alert(
            `New todo submitted: ${event.currentTarget["new-item-input"].value}`
          );
          event.currentTarget.reset();
        }}
      >
        <label htmlFor="new-item-input">New Todo</label>
        <input type="text" id="new-item-input" autoFocus={100} />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        <li>Learn React</li>
        <li>Join Lunch Dev Discord</li>
        <li>Listen to React Podcast</li>
      </ul>
    </main>
  );
}

export default App;
