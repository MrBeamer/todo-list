import { capitalize } from "./helper.js";
import { formateDate } from "./helper.js";
import lowIcon from "./assets/icons/priority-icon-low.svg";
import medIcon from "./assets/icons/priority-icon-medium.svg";
import highIcon from "./assets/icons/priority-icon-high.svg";

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
  _headerDate = document.querySelector(".intro-date");
  _headerWelcome = document.querySelector(".intro-welcome");
  _priorityIcons = document.querySelectorAll(".priority-icon");
  _lowPriorityIcon = document.querySelectorAll(".priority-icon-low");
  _mediumPriorityIcon = document.querySelectorAll(".priority-icon-medium");
  _highPriorityIcon = document.querySelectorAll(".priority-icon-high");
  _priorityMediumInputEdit = document.getElementById("edit-medium-input");
  _priorityLowInputEdit = document.getElementById("edit-low-input");
  _priorityHighInputEdit = document.getElementById("edit-high-input");
  _priorityOptions = document.querySelectorAll(".priority-option");

  renderPriorityIcon(priority) {
    const lookUpIcon = {
      low: lowIcon,
      medium: medIcon,
      high: highIcon,
    };
    return lookUpIcon[priority];
  }

  renderIcons() {
    this._priorityOptions.forEach((priorityOption) => {
      const priority = priorityOption.dataset.priority;
      const priorityIconHtmlElement =
        priorityOption.querySelector(".priority-icon");
      priorityIconHtmlElement.src = this.renderPriorityIcon(priority);
    });

    this._priorityIcons.forEach((icon) => {
      if (icon.classList.contains("priority-icon-high")) {
        icon.src = highIcon;
      } else if (icon.classList.contains("priority-icon-medium")) {
        icon.src = medIcon;
      } else {
        icon.src = lowIcon;
      }
    });
  }

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

  prefillPriority(priority) {
    if (priority === "low") {
      this._priorityLowInputEdit.checked = true;
    } else if (priority === "medium") {
      this._priorityMediumInputEdit.checked = true;
    } else if (priority === "high") {
      this._priorityHighInputEdit.checked = true;
    }
  }

  prefillEditForm(description, date, assignedListTitle, todoId, priority) {
    this._taskEditForm.value = description;
    this._dateEditForm.value = date; // needs to have this format to work "2018-07-22"
    this._listEditForm.value = assignedListTitle;
    this._hiddenFieldEditFormAssignedListTitle.value = assignedListTitle;
    this._hiddenFieldEditForm.value = todoId;
    this.prefillPriority(priority);
  }

  updateTaskCard(
    description,
    date,
    assignedListTitle,
    todoId,
    iconColor,
    priority,
  ) {
    for (let taskItem of this._tasklist.children) {
      if (taskItem.dataset.todoId === todoId) {
        let todoDescription = taskItem.querySelector("label");
        let todoDate = taskItem.querySelector(".task-item-date");
        let todoCheckbox = taskItem.querySelector("input");
        let todoIconColor = taskItem.querySelector(".list-icon");
        let priorityIcon = taskItem.querySelector(".task-item-priority img");
        todoDescription.textContent = description;
        todoDate.textContent = formateDate(date, "ger");
        taskItem.dataset.assignedList = assignedListTitle;
        todoCheckbox.dataset.assignedList = assignedListTitle;
        todoIconColor.style.backgroundColor = iconColor;
        priorityIcon.src = this.renderPriorityIcon(priority);
      }
    }
  }

  renderTask(todoItem) {
    console.log(todoItem);
    // Render new task
    const todoItemHtmlElement = `<li class="task-item" data-todo-id="${todoItem._id}" data-assigned-list="${todoItem._assignedListTitle}">
          <div class="task-item-left" >
            <input type="checkbox" id="${todoItem._id}" data-assigned-list="${todoItem._assignedListTitle}"/>
            <label for="${todoItem._id}">${todoItem._description}</label>
            <div class="list-icon" style="background-color: ${todoItem._iconColor}"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-priority"> <img src=" ${this.renderPriorityIcon(todoItem._priority)}" alt="priority icon"></div>
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

  renderNavList({ listTitle, iconColor }) {
    // used destructuring

    const navListHtmlElement = `<li class="nav-item" data-filter="${listTitle.toLowerCase()}">
            <div class="list">
              <div class="list-icon" style="background-color: ${iconColor}"></div>
              <p class="list-title">${capitalize(listTitle)}</p>
            </div>
            <span class="list-count" data-list="${listTitle.toLowerCase()}">0</span>
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
            <div class="task-item-priority"> <img src=" ${this.renderPriorityIcon(todo._priority)}" alt="priority icon"></div>
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
