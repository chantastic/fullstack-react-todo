import * as React from "react";

export function reducer(currentTodos, action) {
  switch (action.type) {
    case "APPEND_CREATE":
      return [...currentTodos, action.payload];
    case "DELETE":
      return currentTodos.filter((item) => item.id !== action.payload);
    case "UPDATE":
      return currentTodos.reduce(
        (items, item) => [
          ...items,
          action.payload.id === item.id
            ? { ...item, title: action.payload.text }
            : item,
        ],
        []
      );
    case "DEBUG:CLEAR":
      return [];
    case "DEBUG:SEED":
      return [
        { id: 100, title: "Learn React" },
        { id: 101, title: "Join Lunch Dev Discord" },
        { id: 102, title: "Listen to React Podcast" },
      ];
    default:
      return currentTodos;
  }
}
