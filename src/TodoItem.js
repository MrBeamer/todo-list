class TodoItem {
  _isChecked = false;
  constructor(title, description, dueDate = "none", priority = "none") {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  toggleIsChecked() {
    this._isChecked = !this._isChecked;
  }

  get isChecked() {
    return this._isChecked;
  }

  get title() {
    return this._title;
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
}

const test = new TodoItem("Title me", "Description you", "12.03.2026", "high");
console.log(test);
console.log(test._title);

//console.log(lookUp[2]);

export { TodoItem };
