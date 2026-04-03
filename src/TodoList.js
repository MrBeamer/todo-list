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

  deleteItem(item) {
    // item.id === ui.id;
    //placeholder
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
