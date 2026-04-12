# Owari 🩸
 
A clean, minimal todo list app built with vanilla JavaScript using the MVC (Model-View-Controller) design pattern. *Owari* means "done" in Japanese.
 
## Features
 
- Create, edit, and delete todo items
- Assign todos to custom lists
- Set priority levels (Low, Medium, High)
- Filter todos by list
- Persistent storage via localStorage
- Dynamic greeting based on time of day
- Responsive date formatting
 
## Tech Stack
 
- Vanilla JavaScript (ES6+ Classes, Modules)
- Webpack (bundler)
- date-fns (date formatting)
- CSS custom properties
- HTML5 Dialog API
- localStorage
 
## Project Structure
 
```
src/
├── index.js              # Entry point
├── TodoController.js     # MVC Controller
├── TodoModel.js          # MVC Model
├── TodoView.js           # MVC View
├── TodoItem.js           # TodoItem class
├── TodoList.js           # TodoList class
├── StorageService.js     # localStorage abstraction
├── helper.js             # Utility functions
├── styles.css            # Global styles
└── assets/
    └── icons/            # SVG priority icons
```
 
## Live Version
https://mrbeamer.github.io/todo-list/

## Getting Started
 
### Prerequisites
 
- Node.js
- npm
 
### Installation
 
```bash
git clone https://github.com/MrBeamer/todo-list
cd todo-list
npm install
```
 
### Development
 
```bash
npx webpack serve
```
 
Open [http://localhost:8080](http://localhost:8080) in your browser.
 
### Build
 
```bash
npx webpack
```
 
## Architecture
 
The app follows the MVC pattern:
 
- **Model** — manages data (`TodoModel`, `TodoList`, `TodoItem`)
- **View** — handles all DOM rendering and UI updates (`TodoView`)
- **Controller** — connects model and view, handles user events (`TodoController`)
- **StorageService** — handles reading and writing to localStorage
 
## Data Persistence
 
All todo items and lists are serialized to JSON and saved to localStorage on every create, update, and delete action. On page load, data is rehydrated back into class instances via static `fromJSON` methods.
 
## Author
Built by me as a learning project exploring OOP, MVC architecture, and modern JavaScript.
 