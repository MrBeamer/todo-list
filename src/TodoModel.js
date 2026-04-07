// here put in update and delete and add but calling it the controller also handle the list and the items here
// add native color picker for html
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";

// delete later just for testing list system
const all = new TodoList("all", "#d2fb03ff");
const fun = new TodoList("fun", "#036afb");

class TodoModel {
  _todoLists = [all, fun];
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
    // console.log(this._todoLists);
    return this._todoLists.find((element) => element._title === listTitle);
  }
}

// delete later just for testing list system
// const test2 = new TodoModel();

// const result = test2.findTodoList("gym");
// console.log(result);
export { TodoModel };
