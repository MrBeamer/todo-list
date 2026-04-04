import { capitalize } from "./helper.js";

class TodoView {
  _tasklist = document.querySelector("#main-task-list");
  _formTask = document.querySelector(".form-task");
  _formList = document.querySelector(".form-list");
  _selectForm = document.querySelector("#list");
  _navList = document.querySelector(".nav-list");
  _listIcon = document.querySelector(".list-icon");
  _dialogList = document.querySelector("#dialog-create-list");
  _dialogTask = document.querySelector("#dialog-create-task");
  _listCount = document.querySelector(".list-count");
  _countAllTodos = document.querySelector('[data-list="home"]');
  // _listCounters = document.querySelectorAll(".list-count");

  constructor() {}

  renderTask(todoItem) {
    // Render new task
    const todoItemHtmlElement = `<li class="task-item">
          <div class="task-item-left">
            <input type="checkbox" id="${todoItem._id}" data-assigned-list="${todoItem._assignedListTitle}"/>
            <label for="${todoItem._id}">${todoItem._description}</label>
            <div class="list-icon" style="background-color: ${todoItem._iconColor}"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-date">${todoItem._dueDate}</div>
            <button class="material-icons task-item-menu">more_vert</button>
          </div>
        </li>`;

    this._tasklist.insertAdjacentHTML("beforeend", todoItemHtmlElement);
  }

  // Render in form Dropdown options of assignable todo-lists
  renderFormDropdown(dataObj) {
    const title = capitalize(dataObj.listTitle);

    const optionHtmlElement = `<option value="${title.toLowerCase()}">${title}</option>`;

    this._selectForm.insertAdjacentHTML("beforeend", optionHtmlElement);
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

  updateListCounter(todItem, todoList) {
    const listCounters = document.querySelectorAll(".list-count"); // here until I have local memory because it needs to refresh other wise it will only capture the prerender elements, after local memory move it up to the other queries and add the function at the end of the file
    for (let listCounter of listCounters) {
      if (listCounter.dataset.list === todItem.assignedListTitle) {
        listCounter.textContent = todoList.list.length;
      }
    }
  }

  updateTotalCount(arr) {
    this._countAllTodos.textContent = arr.length;
  }

  renderFilteredTasks(listHtmlElement) {
    // Clears the list container
    this._tasklist.innerHTML = "";
    listHtmlElement.forEach((todo) => {
      const todoItemHtmlElement = `<li class="task-item">
          <div class="task-item-left">
            <input type="checkbox" id="${todo._id}" data-assigned-list="${todo._assignedListTitle}"/>
            <label for="${todo._id}">${todo._description}</label>
            <div class="list-icon" style="background-color: ${todo._iconColor}"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-date">${todo._dueDate}</div>
            <button class="material-icons task-item-menu">more_vert</button>
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
