class TodoList {
  _list = [];

  constructor(title) {
    this._title = title;
  }

  addItem(item) {
    this._list.push(item);
  }

  deleteItem(item) {
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
