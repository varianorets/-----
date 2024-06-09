const todoInp = document.querySelector(".todo__inp");
const todoBtn = document.querySelector(".todo__btn");
const todoBody = document.querySelector(".todo__body");
const todoComplete = document.querySelector(".todo__complete");
const todoCount = document.querySelector(".todo__count");
const clearBtn = document.querySelector(".todo__clear");
const template = document.querySelector(".todo__template");

let todoArr = [];
renderTodo(todoArr);

function renderTodo(arr) {
  todoBody.innerHTML = "";
  arr.forEach(function (elem, index) {
    const clone = template.content.cloneNode(true);
    //запись для клонирования шаблона
    const todoText = clone.querySelector(".todo__name");
    const todoInput = clone.querySelector(".inp-cbx");
    const todoLebel = clone.querySelector(".cbx");
    const todoDelete = clone.querySelector(".todo__delete");
    todoDelete.onclick = function () {
      todoArr = todoArr.filter(function (item, itemIndex) {
        return itemIndex != index;
      });
      renderTodo(todoArr);
    };
    todoInput.onchange = function () {
      const checked = todoInput.checked;
      elem.complete = checked;
      getTodoInfo();
    };
    todoInput.id = index;
    todoInput.checked = elem.complete;
    todoLebel.htmlFor = index;
    todoText.innerHTML = elem.text;
    todoBody.append(clone);
  });
  getTodoInfo();
}

todoBtn.onclick = addTodo;
function addTodo() {
  let text = todoInp.value;
  if (text.trim() != "") {
    todoArr.push({ text: text, complete: false });
    renderTodo(todoArr);
    todoInp.value = "";
  } else {
    alert("text required");
  }
}
function getTodoInfo() {
  let completeArr = todoArr.filter(function (elem, index) {
    return elem.complete === true;
  });
  todoComplete.innerHTML = completeArr.length;
  todoCount.innerHTML = todoArr.length;
}

clearBtn.onclick = clearTodo;
function clearTodo() {
  if (confirm("are you sure?")) {
    todoArr = [];
    renderTodo(todoArr);
  }
}
