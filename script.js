

function checkTodo() {
  const items = document.querySelectorAll('.list-group-item');

  for (let i = 1; i <= items.length; i++)
  {
    const checkbox = document.getElementById(i.toString());

    checkbox.addEventListener("change", function() {
      updateCounter(items.length);
      let todos = getTodos(items.length);

      render(todos);
    });
  }
}

function getTodos(value) {
  let todos = new Set();

  let amount = 0;

  for (let i = 1; i <= value; i++)
  {
    const checkbox = document.getElementById(i.toString());

    let todo = new Map();

    if (checkbox.checked)
      todo.set('ischeck', true);
    else
      todo.set('ischeck', false);

    let spans = document.getElementsByTagName("span");

    todo.set('text', spans[amount + 4].textContent);

    todos.add(todo);

    amount++;
  }

  return todos;
}

function updateCounter(value)
{
  let amount = 0;

  const itemCountElement = document.getElementById('item-count');
  const uncheckedCountElement = document.getElementById('unchecked-count');

  itemCountElement.textContent = value;
  
  for (let i = 1; i <= value; i++)
    {
      const checkbox = document.getElementById(i.toString());
      if (checkbox.checked)
        continue;
      else
      amount++;
    }

  uncheckedCountElement.textContent = amount;
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const items = document.querySelectorAll('.list-group-item');

let todos = getTodos(items.length);

checkTodo();
updateCounter(items.length);

function render(todos)
{
  let content = '';

  let rTodos = renderTodo(todos)

  rTodos.forEach(function(value){
    content += value;
  });

  list.innerHTML = content;

  checkTodo();
}

function newTodo() {
  let todo_name = prompt("Enter TODO name");

  const items = document.querySelectorAll('.list-group-item');

  let todos = getTodos(items.length);

  if (todo_name)
  {
    let todo = new Map();

    todo.set('ischeck', false);
    todo.set('text', todo_name);

    todos.add(todo);

    render(todos);
    updateCounter(items.length + 1);
  }
  else
    alert("You didn't enter something!");
}


function renderTodo(todos)
{
  let rTodos = new Set();
  let amount = 1;

  todos.forEach(function(value) {
    if (value.get('ischeck') === false) {
      rTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ amount + '" />\n<label for="'+ amount + '"><span class="  ">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + amount + ')">delete</button>\n</li>');
    }
    else if (value.get('ischeck') === true) {
      rTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ amount + '" checked />\n<label for="'+ amount + '"><span class="text-success text-decoration-line-through">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + amount + ')">delete</button>\n</li>');
    }
    amount++;
  });

  return rTodos;
}

function deleteTodo(index) {
  const items = document.querySelectorAll('.list-group-item');

  let todos = getTodos(items.length);
  let amount = 1;

  todos.forEach(function(value){
    if (amount === index) {
      todos.delete(value);
    }
    amount++;
  });

  render(todos);
  updateCounter(amount - 2);
}