class TodoModel {
  _todoLists = [];
  _allTodos = [];

  updateList() {
    //placeholder
  }

  addToAllTodos(todo) {
    this._allTodos.push(todo);
  }

  get allTodos() {
    return this._allTodos;
  }

  set allTodos(arr) {
    this._allTodos = arr;
  }

  addList(list) {
    this._todoLists.push(list);
  }

  deleteFromAllTodos(todoId) {
    const todoIndex = this._allTodos.findIndex((item) => {
      return item._id === todoId;
    });
    this._allTodos.splice(todoIndex, 1);
  }
  get todoLists() {
    return this._todoLists;
  }

  findTodoList(listTitle) {
    return this._todoLists.find((element) => element._title === listTitle);
  }
}

export { TodoModel };
