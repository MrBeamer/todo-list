class StorageService {
  get todoLists() {
    const json = localStorage.getItem("todoLists");
    return JSON.parse(json);
  }

  get allTodosList() {
    const json = localStorage.getItem("allTodosList");
    return JSON.parse(json);
  }

  saveTodoLists(todoListsArr) {
    const todoListsStr = JSON.stringify(todoListsArr);
    localStorage.setItem("todoLists", todoListsStr);
  }
  saveAllTodosList(allTodosListArr) {
    const allTodosListStr = JSON.stringify(allTodosListArr);
    localStorage.setItem("allTodosList", allTodosListStr);
  }
}

export { StorageService };

// get todItem() {
//   const json = localStorage.getItem("todoItem");
//   return JSON.parse(json);
// }

// get todoList() {
//   const json = localStorage.getItem("todoList");
//   return JSON.parse(json);
// }

// get allTodosList() {
//   const json = localStorage.getItem("allTodosList");
//   return JSON.parse(json);
// }

///
// saveTodoItem(todoObj) {
//   const todoStr = JSON.stringify(todoObj);
//   localStorage.setItem("todoItem", todoStr);
// }

// saveTodoList(todoListArr) {
//   const todoListStr = JSON.stringify(todoListArr);
//   localStorage.setItem("todoList", todoListStr);
// }
// saveAllTodosList(todoListArr) {
//   const todoListStr = JSON.stringify(todoListArr);
//   localStorage.setItem("todoList", todoListStr);
// }
