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
