import { TodoItem } from "./TodoItem.js";
import { TodoView } from "./TodoView.js";
import { TodoModel } from "./TodoModel.js";
import { TodoList } from "./TodoList.js";
import { capitalize } from "./helper.js";

// Add when created task that correct icon is applied
// add edit task, move task, delete task to every todo-item
// Add filtering based on lists
// Make the list counter work

class TodoController {
  _view = new TodoView();
  _model = new TodoModel();

  constructor() {
    this._view._tasklist.addEventListener("click", (event) =>
      this.updateCheckedState(event),
    );
    this._view._formTask.addEventListener("submit", (event) =>
      this.getTaskFormData(event),
    );

    this._view._formList.addEventListener("submit", (event) =>
      this.getListFormData(event),
    );
  }

  updateCheckedState(event) {
    console.log(event.target); //placeholder
  }

  createTodoItem(dataObj) {
    return new TodoItem(
      dataObj.taskDescription,
      dataObj.date,
      dataObj.taskList,
    );
  }
  createTodoList(dataObj) {
    return new TodoList(dataObj.listTitle, dataObj.iconColor);
  }

  assignItemToList(todoItem) {
    const todoList = this._model.findTodoList(todoItem._assignedListTitle);
    console.log(todoList);
    todoList.addItem(todoItem);
    console.log(todoItem);
    console.log(todoList);
    console.log(this._model.todoLists);
  }

  // Get data from task form
  getTaskFormData(event) {
    event.preventDefault();
    // Get data from form submission
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());

    //Create new todo in database
    const todoItem = this.createTodoItem(dataObj);

    // Assign new todo to list
    this.assignItemToList(todoItem);
    //just to check delete later
    console.log(this._model.todoLists);

    // Add todo to UI
    this._view.renderTask(dataObj);

    // Close window after submit
    this._view._dialogTask.close();
  }

  // Get data from list form
  getListFormData(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(dataObj);

    // Create database entry for new list
    const todoList = this.createTodoList(dataObj);

    // Push new todo-list into list of todo-lists
    this._model.addList(todoList);
    console.log(this._model.todoLists);

    // Render todo list in navigation and icon
    this._view.renderNavList(dataObj);

    // Update task form dropdown
    this._view.renderFormDropdown(dataObj);

    // Close window after submit
    this._view._dialogList.close();
  }

  init() {}
}

export { TodoController };
