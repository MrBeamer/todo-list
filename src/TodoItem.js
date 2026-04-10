class TodoItem {
  _isChecked = false;
  _id = crypto.randomUUID();
  _iconColor = "";
  _assignedListId = "";
  constructor(description, dueDate = "none", assignedListTitle) {
    // this._title = title;  // not used right now
    this._description = description;
    this._dueDate = dueDate;
    this._assignedListTitle = assignedListTitle;
    // this._priority = priority; // not used right now
  }

  toggleIsChecked() {
    this._isChecked = !this._isChecked;
  }

  get iconColor() {
    return this._iconColor;
  }

  set iconColor(color) {
    this._iconColor = color;
  }

  get isChecked() {
    return this._isChecked;
  }

  get title() {
    return this._title;
  }

  get assignedListTitle() {
    return this._assignedListTitle;
  }

  set assignedListTitle(listTitle) {
    this._assignedListTitle = listTitle;
  }

  get description() {
    return this._description;
  }

  get dueDate() {
    return this._dueDate;
  }

  get priority() {
    return this._priority;
  }

  get id() {
    return this._id;
  }

  set title(title) {
    this._title = title;
  }

  set description(description) {
    this._description = description;
  }

  set dueDate(date) {
    this._dueDate = date;
  }

  set priority(input) {
    const lookUp = {
      0: "none",
      1: "low",
      2: "medium",
      3: "high",
    };
    this._priority = lookUp[input];
  }

  update(description, date, listTitle, iconColor) {
    this._description = description;
    this._dueDate = date;
    this._assignedListTitle = listTitle;
    this._iconColor = iconColor;
  }

  static fromJSON(obj) {
    const item = new TodoItem(
      obj._description,
      obj._dueDate,
      obj._assignedListTitle,
    );

    item._id = obj._id;
    item._isChecked = obj._isChecked;
    item._iconColor = obj._iconColor;
    item._assignedListId = obj._assignedListId;

    return item;
  }
}

export { TodoItem };
