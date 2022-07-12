// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }

}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(task) {
    this.todos.push(task);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos.at(-1);
  }

  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx]
  }

  markDoneAt(idx) {
    this.itemAt(idx).markDone();
  }

  markUndoneAt(idx) {
    this.itemAt(idx).markUndone();
  }

  allDone() {
    return this.todos.every(todo => todo.isDone());
  }

  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw new ReferenceError(`invalid index: ${idx}`);
    }
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1);
  }

  toString() {
    let title = `===${this.title}===`;
    let list = this.todos.map(task => task.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(cb) {
    this.todos.forEach(cb);
  }

  filter(cb) {
    let result = new TodoList(this.title);

    this.forEach(ele => {
      if (cb(ele)) result.add(ele);
    });

    return result;
  }

  findByTitle(title) {
    return this.filter(task => task.title === title).first();
  }

  allDone() {
    return this.todos.every(task => task.isDone())
  }

  allNotDone() {
    return !this.allDone();
  }

  markDone(title) {
    this.findByTitle(title).markDone();
  }

  markAllDone() {
    this.forEach(task => {
      if (!task.isDone()) task.markDone();
    })
  }

  markAllUndone() {
    this.forEach(task => {
      if (task.isDone()) task.markUndone();
    })
  }

  toArray() {
    return this.todos.slice();
  }

}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();


console.log(list.toArray())