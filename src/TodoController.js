import { TodoItem } from "./TodoItem.js";
import { TodoView } from "./TodoView.js";
import { TodoModel } from "./TodoModel.js";
import { TodoList } from "./TodoList.js";

// add edit task, move task, delete task to every todo-item
// when in filtered state adding a new task will just display it in filtered view - should be not visible or?
// Remove Home bubble and call it all which shows ever task in a unfiltered state?
// Capture unchecked and checked state in the data - from every task - hardcode with all the titles so its renders all off them
// Format date correctly
// add auto update current date to headline

class TodoController {
  _view = new TodoView();
  _model = new TodoModel();

  constructor() {
    this._view._tasklist.addEventListener("click", (event) =>
      this.handleCheckedState(event),
    );
    this._view._formTask.addEventListener("submit", (event) =>
      this.getTaskFormData(event),
    );

    this._view._formList.addEventListener("submit", (event) =>
      this.getListFormData(event),
    );

    this._view._navList.addEventListener("click", (event) => {
      this.handleListFilter(event);
    });
  }

  handleCheckedState(event) {
    // If click is not not input - return
    if (!event.target.closest("input")) return;
    // Restricts click to only register input
    const checkBox = event.target.closest("input");
    // Get assigned todo-list title
    const assignedList = checkBox.dataset.assignedList;
    // Find todo-list
    const todoList = this._model.findTodoList(assignedList);
    // Get the array from the todo-list object and then filter for the correct todo-item (data entry)
    const todoItem = todoList._list.find((todo) => todo._id === checkBox.id);
    todoItem.toggleIsChecked();
    console.log(todoItem);
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

  // Get data from task form
  getTaskFormData(event) {
    event.preventDefault();
    // Get data from form submission
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());

    //Create new todo in database
    const todoItem = this.createTodoItem(dataObj);

    // Find todo-list
    const todoList = this._model.findTodoList(todoItem._assignedListTitle);

    // Get icon color from todo-list for the task card
    const iconColor = todoList._iconColor;
    // Set iconColor in data of the todo-item
    todoItem._iconColor = iconColor;

    // Assign new todo to list / Add task to todo-list
    todoList.addItem(todoItem);
    console.log(todoItem);
    console.log(this._model.todoLists);

    // Add todo to UI
    this._view.renderTask(todoItem);

    // Update todo-list counter UI
    this._view.updateListCounter(todoItem, todoList);

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

  handleListFilter(event) {
    // Get HTML Element with the class nav-item
    const navItem = event.target.closest(".nav-item");
    // Get from the HTML Element the filter-name
    const filter = navItem.dataset.filter;
    // Find based on the filter-name the corresponding todo-list
    const todoList = this._model.findTodoList(filter);

    // Update active filter - background-color
    this._view.updateActiveFilter(todoList);

    // If the todo-list is empty - do nothing
    if (todoList._list.length === 0) return;
    // Else clean tasklist and render the filtered todo-list
    this._view._tasklist.innerHTML = "";
    this._view.renderFilteredTasks(todoList);
  }

  init() {
    const todoItem1 = new TodoItem(
      "Watch Netflix - Vinland Saga",
      "20.05.2026",
      "home",
    );
    const todoItem2 = new TodoItem("  Learn Coding", "20.04.2026", "home");

    const todoList1 = this._model.findTodoList(todoItem1._assignedListTitle);
    const todoList2 = this._model.findTodoList(todoItem2._assignedListTitle);

    const iconColor1 = todoList1._iconColor;
    const iconColor2 = todoList2._iconColor;
    todoItem1._iconColor = iconColor1;
    todoItem2._iconColor = iconColor2;

    todoList1.addItem(todoItem1);
    todoList2.addItem(todoItem2);

    this._view.renderTask(todoItem1);
    this._view.renderTask(todoItem2);

    this._view.updateListCounter(todoItem1, todoList1);
    this._view.updateListCounter(todoItem2, todoList2);
    console.log("init");
  }
}

export { TodoController };
