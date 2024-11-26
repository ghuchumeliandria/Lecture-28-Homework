const form = document.getElementById("form");
const input = document.getElementById("input");
const nodeText = document.getElementById("nodeText");
const todoList = document.getElementById("todoList");
const submitBtn = document.getElementById("submitBtn");
const trash = document.getElementById("trash");
const mainList = document.getElementById("mainList");
const dayTime = document.getElementById("dayTime");
const day = document.getElementById("day")

const today = new Date();
const dayNum = today.getDate()
const days = today.getDay();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const daysFn = (param) => weekDays[param];

// console.log(daysFn(days) ,dayNum );
let data = JSON.parse(localStorage.getItem("task")) || [];

let dateTime = new Date();
let hours = dateTime.getHours();
let minutes = dateTime.getMinutes();
dayTime.textContent = `${hours}:${minutes}`;
day.textContent = ` ${daysFn(days)} ${dayNum}`
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    alert("გთხოვ შეიყვანე ტექსტი");
  } else if (input.value.length > 10) {
    alert("შეიყვანე მოკლე შეტყობინება");
  } else {
    let taskOb = {
      id: input.value,
      time: Date().slice(0, Date().length - 33),
      check: false,
    };
    createList(taskOb);
    data.push(taskOb);
    localStorage.setItem("task", JSON.stringify(data));
  }

  input.value = "";
});

function createList(task) {
  let div = document.createElement("div");
  div.classList.add("todo-list-main");
  mainList.appendChild(div);

  let todoListDiv = document.createElement("div");
  todoListDiv.classList.add("todo-list-note");
  div.appendChild(todoListDiv);

  let todoListText = document.createElement("div");
  todoListText.classList.add("todo-list-note-text");
  todoListDiv.appendChild(todoListText);

  let h1 = document.createElement("h1");
  h1.textContent = task.id;
  todoListText.appendChild(h1);

  let p = document.createElement("p");
  p.textContent = task.time;
  todoListText.appendChild(p);

  let textMark = document.createElement("div");
  textMark.classList.add("text-mark");
  todoListDiv.appendChild(textMark);

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("radio-btn");
  checkbox.checked = task.check;
  textMark.appendChild(checkbox);

  checkbox.addEventListener("click", () => {
    task.check = checkbox.checked;
    if (task.check === true) {
      h1.classList.add("list-line");
      p.classList.add("list-line");
    } else {
      h1.classList.remove("list-line");
      p.classList.remove("list-line");
    }
    localStorage.setItem("task", JSON.stringify(data));
  });

  if (task.check === true) {
    h1.classList.add("list-line");
    p.classList.add("list-line");
  } else {
    h1.classList.remove("list-line");
    p.classList.remove("list-line");
  }

  let img = document.createElement("img");
  img.src = "./images/trash.png";

  img.addEventListener("click", () => {
    div.remove();
    data = data.filter((param) => {
      return param.id != task.id;
    });
    localStorage.setItem("task", JSON.stringify(data));
  });

  textMark.appendChild(img);
}

data.forEach((value) => {
  createList(value);
});
