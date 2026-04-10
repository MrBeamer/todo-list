// A list should hold color code and the title

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
      console.log("what is the toID:");
      console.log(todoId);
      return item._id === todoId;
    });
    this._list.splice(todoIndex, 1);
  }

  findTodo(todoId) {
    console.log(this._list);
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
}

export { TodoList };
