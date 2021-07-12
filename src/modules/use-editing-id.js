import * as React from "react";

export default function useEditingId() {
  return React.useReducer((_, action) => {
    if (typeof action === "number") return action;

    switch (action.type) {
      case "CONCLUDE_EDITING":
        return -1;
      case "SET_EDITING_ID":
        return action.id;
      default:
        break;
    }
  }, -1);
}
