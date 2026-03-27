// here put in update and delete and add but calling it the controller also handle the list and the items here
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";
class TodoModel {
  _todoLists = [];
  constructor() {}

  updateItem() {
    //placeholder
  }

  addList() {
    //placeholder
  }

  deleteList() {
    //placeholder
  }
  get todoLists() {
    return this._todoLists;
  }
}

export { TodoModel };
