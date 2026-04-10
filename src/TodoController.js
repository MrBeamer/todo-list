import { TodoItem } from "./TodoItem.js";
import { TodoView } from "./TodoView.js";
import { TodoModel } from "./TodoModel.js";
import { TodoList } from "./TodoList.js";
import { currentDate } from "./helper.js";
import { calcTimePhrase } from "./helper.js";

// last thing when everything works clean up _assignedListTitle and id on input and all functions which use the value allign to one either id or _assignedListTitle

class TodoController {
  _view = new TodoView();
  _model = new TodoModel();
  _activeFilter = "all"; // all is default list like all

  constructor() {
    this._view._tasklist.addEventListener("click", (event) =>
      this.handleCheckedState(event),
    );
    this._view._formTask.addEventListener("submit", (event) =>
      this.handleTaskFormData(event),
    );

    this._view._formList.addEventListener("submit", (event) =>
      this.handleListFormData(event),
    );

    this._view._navList.addEventListener("click", (event) => {
      this.handleListFilter(event);
    });

    this._view._tasklist.addEventListener("click", (event) =>
      this.handleDelete(event),
    );

    this._view._formEditTask.addEventListener("submit", (event) =>
      this.handleUpdate(event),
    );
    this._view._tasklist.addEventListener("click", (event) =>
      this.handlePrefillForm(event),
    );
  }

  handlePrefillForm(event) {
    const todoMenu = event.target.closest(".task-item-menu");
    const todoCard = event.target.closest(".task-item");
    const assignedList = todoCard.dataset.assignedList;
    const todoId = todoCard.dataset.todoId;

    if (!todoMenu) return;
    // Find todo-list
    const todoList = this._model.findTodoList(assignedList);
    // Based on click pass todo in delete or edit
    if (todoMenu.classList.contains("btn-task-edit")) {
      // Find clicked todo-item in todo-list
      const todoItem = todoList.findTodo(todoId);
      //Prefills the edit-form based on clicked todo-item - UI
      this._view.prefillEditForm(
        todoItem._description,
        todoItem._dueDate,
        todoItem._assignedListTitle,
        todoItem._id,
        todoItem._iconColor,
      );
    }
  }

  handleUpdate(event) {
    // Prevent form native behavior (rerendering after submit)
    event.preventDefault();
    // Get data from form submission
    const formData = new FormData(event.target);
    const dataObj = Object.fromEntries(formData.entries());
    // Destructuring of the object
    const {
      taskDescription,
      date,
      taskList,
      hiddenFormTodoId,
      hiddenFormTodoAssignedList,
    } = dataObj;
    // Find todo-list before submit / old list before submit
    const todoListBeforeSubmit = this._model.findTodoList(
      hiddenFormTodoAssignedList,
    );
    // Find todo-list after submit / new assigned list after submit
    const todoListAfterSubmit = this._model.findTodoList(taskList);

    // Get updated icon color from newly assigned todo-list
    const newIconColor = todoListAfterSubmit._iconColor;
    // Find clicked todo-item in todo-list before submission
    const todoItem = todoListBeforeSubmit.findTodo(hiddenFormTodoId);

    // Data entry update todo-item
    todoItem.update(taskDescription, date, taskList, newIconColor); //error must be in update

    // Delete todo-item from list before submission - Data entry need to update todo-list
    todoListBeforeSubmit.deleteItem(todoItem._id);
    // Add todo-item to updated list after submission - Data entry need to update todo-list
    todoListAfterSubmit.addItem(todoItem);

    // Update todo-card  - UI
    this._view.updateTaskCard(
      taskDescription,
      date,
      taskList,
      hiddenFormTodoId,
      newIconColor,
    );

    // Update todo-list counter - UI
    this._view.updateListCounter(this._model._todoLists, this._model.allTodos);
    console.log("just before render function:");
    console.log(todoListBeforeSubmit.list);
    // Update current displayed tasklist after edit of a todo - UI
    this._view.renderFilteredTasks(todoListBeforeSubmit.list);

    // Check if active filter is all, to prevent that all todos get rendered for other todo-lists
    if (this._activeFilter === "all") {
      // Update the tab "all" todo-list when a new task is created  - UI
      this._view.renderFilteredTasks(this._model.allTodos);
    }

    // Close window after submit
    this._view._dialogEditTask.close();
  }

  handleDelete(event) {
    const todoMenu = event.target.closest(".task-item-menu");
    const todoCard = event.target.closest(".task-item");
    const assignedList = todoCard.dataset.assignedList;
    const todoId = todoCard.dataset.todoId;
    if (!todoMenu) return;
    // Find todo-list
    const todoList = this._model.findTodoList(assignedList);
    // Based on click pass todo in delete or edit
    if (todoMenu.classList.contains("btn-task-delete")) {
      // Find todo in list and delete from Database
      todoList.deleteItem(todoId);
      // Find todo in the allTodolist (model) and delete from Database
      this._model.deleteFromAllTodos(todoId);
      // Find todo html element and delete it from UI
      this._view.deleteTask(todoId);
      // Update todo-list counter UI
      this._view.updateListCounter(
        this._model._todoLists,
        this._model.allTodos,
      );
    }
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
  handleTaskFormData(event) {
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
    // Additionally push it to a list that holds all todos
    this._model.addToAllTodos(todoItem);

    // Add todo to UI, only if active filter equals newly created assignedListTitle of todo-item
    // Makes sure that the todoitem renders in the correct list and not in the current displayed list
    if (this._activeFilter === todoItem._assignedListTitle)
      this._view.renderTask(todoItem);

    // Update todo-list counter and total count of todos from all - UI
    this._view.updateListCounter(this._model._todoLists, this._model.allTodos);

    // Check if active filter is all, to prevent that all todos get rendered for other todo-lists
    if (this._activeFilter === "all") {
      // Update the tab "all" todo-list when a new task is created  - UI
      this._view.renderFilteredTasks(this._model.allTodos);
    }

    // Close window after submit
    this._view._dialogTask.close();
    // Reset input fields after submit
    this._view._formTask.reset();
  }

  // Get data from list form
  handleListFormData(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObj = Object.fromEntries(data.entries());

    // Create database entry for new list
    const todoList = this.createTodoList(dataObj);

    // Push new todo-list into list of todo-lists
    this._model.addList(todoList);

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

    // If navItem is the default one - render all todos from every list and return
    if (navItem.classList.contains("default")) {
      // Update active filter - background-color
      this._view.updateActiveFilter(navItem);
      // Cleans taskList and renders the todo-list which holds all todos
      const allTodoList = this._model.allTodos;
      this._view.renderFilteredTasks(allTodoList);
      // Use dataset to set active filter
      console.log("Filter before switch: ");
      console.log(this._activeFilter);
      this._activeFilter = filter;
      console.log("Filter after switch: ");
      console.log(this._activeFilter);
      return;
    }

    // Find based on the filter-name the corresponding todo-list
    const todoList = this._model.findTodoList(filter);

    // Use dataset to set active filter
    this._activeFilter = filter;
    console.log("Third filter: ");
    console.log(this._activeFilter);

    // Update active filter - background-color
    this._view.updateActiveFilter(todoList);

    // Else clean tasklist and render the filtered todo-list
    this._view.renderFilteredTasks(todoList._list);
    // If the todo-list is empty - do nothing
    if (todoList._list.length === 0) return;
  }

  init() {
    // Renders the dynamic date
    this._view.renderIntro(currentDate, calcTimePhrase);

    // Creates Dummy Data
    const fun = new TodoList("fun", "#036afb");
    this._model.todoLists.push(fun);

    const todoItem1 = new TodoItem(
      "Watch Netflix - Vinland Saga",
      "2026-07-22",
      "fun",
    );
    const todoItem2 = new TodoItem("  Learn Coding", "2026-04-21", "fun");

    const todoList1 = this._model.findTodoList(todoItem1._assignedListTitle);
    const todoList2 = this._model.findTodoList(todoItem2._assignedListTitle);

    const iconColor1 = todoList1._iconColor;
    const iconColor2 = todoList2._iconColor;
    todoItem1._iconColor = iconColor1;
    todoItem2._iconColor = iconColor2;

    todoList1.addItem(todoItem1);
    todoList2.addItem(todoItem2);
    this._model.addToAllTodos(todoItem1);
    this._model.addToAllTodos(todoItem2);

    this._view.renderTask(todoItem1);
    this._view.renderTask(todoItem2);

    this._view.updateListCounter(this._model._todoLists, this._model.allTodos);
    console.log("init");
  }
}

export { TodoController };
