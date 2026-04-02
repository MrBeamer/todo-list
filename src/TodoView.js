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

  constructor() {}

  renderTask(dataObj) {
    // Render new task
    const todoItemHtmlElement = `<li class="task-item">
          <div class="task-item-left">
            <input type="checkbox" id="generated1" name="generated1" />
            <label for="generated1">${dataObj.taskDescription}</label>
            <div class="list-icon"></div>
          </div>
          <div class="task-item-right">
            <div class="task-item-date">${dataObj.date}</div>
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
    const navListHtmlElement = `<li class="nav-item">
            <div class="list">
              <div class="list-icon" style="background-color: ${dataObj.iconColor}"></div>
              <p class="list-title">${title}</p>
            </div>
            <span class="list-count">0</span>
          </li>`;

    this._navList.insertAdjacentHTML("beforeend", navListHtmlElement);
  }

  // setIconColor(color) {
  //   this._listIcon.style.setProperty("background-color", color);
  // }
}

export { TodoView };
