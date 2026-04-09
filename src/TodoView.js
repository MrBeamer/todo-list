import { capitalize } from "./helper.js";
import { formateDate } from "./helper.js";

class TodoView {
  _tasklist = document.querySelector("#main-task-list");
  _formTask = document.querySelector(".form-task");
  _formList = document.querySelector(".form-list");
  _formEditTask = document.querySelector(".form-edit-task");
  _selectForm = document.querySelector("#list");
  _selectEditForm = document.querySelector("#edit-list");
  _navList = document.querySelector(".nav-list");
  _listIcon = document.querySelector(".list-icon");
  _dialogList = document.querySelector("#dialog-create-list");
  _dialogTask = document.querySelector("#dialog-create-task");
  _dialogEditTask = document.querySelector("#dialog-edit-task");
  _listCount = document.querySelector(".list-count");
  _countAllTodos = document.querySelector('[data-list="all"]');
  _taskItems = document.querySelectorAll("task-list > .task-item");
  _taskEditForm = document.querySelector("#edit-task");
  _dateEditForm = document.querySelector("#edit-date");
  _listEditForm = document.querySelector("#edit-list");
  _hiddenFieldEditForm = document.querySelector("#hidden-form-todo-id");
  _hiddenFieldEditFormAssignedListTitle = document.querySelector(
    "#hidden-form-todo-assigned-list",
  );
  _hiddenFieldEditFormIconColor = document.querySelector(
    "#hidden-form-todo-icon-color",
  );
  _headerDate = document.querySelector(".intro-date");
  _headerWelcome = document.querySelector(".intro-welcome");

  deleteTask(todoId) {
    for (let taskItem of this._tasklist.children) {
      if (taskItem.dataset.todoId === todoId) {
        taskItem.remove();
      }
    }
  }

  renderIntro(currentDate, calcTimePhrase) {
    this._headerDate.textContent = currentDate;
    this._headerWelcome.textContent = `Good ${calcTimePhrase()}, Michael.`;
  }

  prefillEditForm(description, date, assignedListTitle, todoId, iconColor) {
    this._taskEditForm.value = description;
    this._dateEditForm.value = date; // needs to have this format to work "2018-07-22"
    this._listEditForm.value = assignedListTitle;
    this._hiddenFieldEditFormAssignedListTitle.value = assignedListTitle;
    this._hiddenFieldEditForm.value = todoId;
    this._hiddenFieldEditFormIconColor.value = iconColor;
  }

  updateTaskCard(description, date, assignedListTitle, todoId, iconColor) {
    for (let taskItem of this._tasklist.children) {
      if (taskItem.dataset.todoId === todoId) {
        let todoDescription = taskItem.querySelector("label");
        let todoDate = taskItem.querySelector(".task-item-date");
        let todoCheckbox = taskItem.querySelector("input");
        let todoIconColor = taskItem.querySelector(".list-icon");
        todoDescription.textContent = description;
        todoDate.textContent = formateDate(date, "ger");
        taskItem.dataset.assignedList = assignedListTitle;
        todoCheckbox.dataset.assignedList = assignedListTitle;
        todoIconColor.style.backgroundColor = iconColor;

        console.log(assignedListTitle);
      }
    }
  }

  renderTask(todoItem) {
    // Render new task
    const todoItemHtmlElement = `<li class="task-item" data-todo-id="${todoItem._id}" data-assigned-list="${todoItem._assignedListTitle}">
          <div class="task-item-left" >
            <input type="checkbox" id="${todoItem._id}" data-assigned-list="${todoItem._assignedListTitle}"/>
            <label for="${todoItem._id}">${todoItem._description}</label>
            <div class="list-icon" style="background-color: ${todoItem._iconColor}"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-date">${formateDate(todoItem._dueDate, "ger")}</div>
            <div class="task-item-menu-container"> 
            <button class="material-icons task-item-menu btn-task-edit" command="show-modal"
          commandfor="dialog-edit-task">edit</button>
            <button class="material-icons task-item-menu btn-task-delete">delete</button>
            </div>
          </div>
        </li>`;

    this._tasklist.insertAdjacentHTML("beforeend", todoItemHtmlElement);
  }

  // Render in form Dropdown options of assignable todo-lists
  renderFormDropdown(dataObj) {
    const title = capitalize(dataObj.listTitle);

    const optionHtmlElement = `<option value="${title.toLowerCase()}">${title}</option>`;

    this._selectForm.insertAdjacentHTML("beforeend", optionHtmlElement);
    this._selectEditForm.insertAdjacentHTML("beforeend", optionHtmlElement);
  }

  renderNavList(dataObj) {
    const title = capitalize(dataObj.listTitle);
    const navListHtmlElement = `<li class="nav-item" data-filter="${title.toLowerCase()}">
            <div class="list">
              <div class="list-icon" style="background-color: ${dataObj.iconColor}"></div>
              <p class="list-title">${title}</p>
            </div>
            <span class="list-count" data-list="${title.toLowerCase()}">0</span>
          </li>`;

    this._navList.insertAdjacentHTML("beforeend", navListHtmlElement);
  }

  updateListCounter(listOfTodoLists, allTodosList) {
    const listCounters = document.querySelectorAll(".list-count"); // here until I have local memory because it needs to refresh other wise it will only capture the prerender elements, after local memory move it up to the other queries and add the function at the end of the file
    for (let listCounter of listCounters) {
      for (let todoList of listOfTodoLists) {
        if (listCounter.dataset.list === todoList.title) {
          listCounter.textContent = todoList.list.length;
        }
      }
    }
    this._countAllTodos.textContent = allTodosList.length; // moving it here fixed the initial 0 for all - but I do not why maybe check if any other list ist called home?
  }

  renderFilteredTasks(list) {
    // Clears the list container
    this._tasklist.innerHTML = "";
    list.forEach((todo) => {
      const todoItemHtmlElement = `<li class="task-item" class="task-item" data-todo-id="${todo._id}" data-assigned-list="${todo._assignedListTitle}">
          <div class="task-item-left">
            <input type="checkbox" id="${todo._id}" data-assigned-list="${todo._assignedListTitle}"/>
            <label for="${todo._id}">${todo._description}</label>
            <div class="list-icon" style="background-color: ${todo._iconColor}"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-date">${formateDate(todo._dueDate, "ger")}</div>
            <div class="task-item-menu-container"> 
            <button class="material-icons task-item-menu btn-task-edit" command="show-modal"
          commandfor="dialog-edit-task">edit</button>
            <button class="material-icons task-item-menu btn-task-delete">delete</button>
            </div>
          </div>
        </li>`;

      this._tasklist.insertAdjacentHTML("beforeend", todoItemHtmlElement);
    });
  }

  updateActiveFilter(element) {
    // If the passed value is not a todoList
    if (element.nodeName === "LI") {
      for (let navItem of this._navList.children) {
        navItem.classList.remove("active");
      }
      element.classList.add("active");
      return;
    }
    //If the passed value is a todo-list
    for (let navItem of this._navList.children) {
      if (element._title === navItem.dataset.filter) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    }
  }
}

export { TodoView };
// here when I have local memory
// for (let listCounter of this._listCounters) {
//     console.log(listCounter.dataset.list);
//     if (listCounter.dataset.list === todItem.assignedListTitle) {
//       listCounter.textContent = todoList.list.length;
//     }
//   }
