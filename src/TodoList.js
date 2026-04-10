import { TodoItem } from "./TodoItem.js";

class TodoList {
  _list = [];
  _id = crypto.randomUUID();
  constructor(title, iconColor) {
    this._title = title.toLowerCase();
    this._iconColor = iconColor;
  }

  addItem(item) {
    this._list.push(item);
  }

  deleteItem(todoId) {
    const todoIndex = this._list.findIndex((item) => {
      return item._id === todoId;
    });
    this._list.splice(todoIndex, 1);
  }

  findTodo(todoId) {
    const item = this._list.find((item) => {
      return item._id === todoId;
    });
    return item;
  }

  get list() {
    return this._list;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  static fromJSON(obj) {
    const list = new TodoList(obj._title, obj._iconColor);
    list._id = obj._id;
    list._list = obj._list.map((element) => TodoItem.fromJSON(element));
    return list;
  }
}

export { TodoList };
