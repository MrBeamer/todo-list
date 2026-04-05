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
      return item._id === todoId;
    });
    this._list.splice(todoIndex, 1);
    console.log(this._list);
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
