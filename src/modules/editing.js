export function reducer(_, action) {
  switch (action.type) {
    case "CONCLUDE_EDITING":
      return -1;
    case "SET_EDITING_ID":
      return action.id;
    default:
      break;
  }
}
