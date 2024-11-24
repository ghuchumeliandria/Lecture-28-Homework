const form = document.getElementById("form");
const input = document.getElementById("input");
const nodeText = document.getElementById("nodeText");
const todoList = document.getElementById("todoList");
const submitBtn = document.getElementById("submitBtn");
const trash = document.getElementById("trash");
const mainList = document.getElementById("mainList");

let today = new Date();
let month = today.toLocaleString("default", { month: "long" });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    alert("");
  } else {
    createList();
  }
  input.value = "";
});

function createList (){
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
    h1.textContent = input.value;
    todoListText.appendChild(h1);
    
    let p = document.createElement("p");
    p.textContent = `${today.getDate()} ${month} `;
    todoListText.appendChild(p);
    
    let textMark = document.createElement("div");
    textMark.classList.add("text-mark");
    todoListDiv.appendChild(textMark);
    
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type" , "checkbox")
    textMark.appendChild(checkbox)
    
    
    
    let img = document.createElement("img");
    img.src = "./images/trash.png";
    img.addEventListener("click", () => {
        if(checkbox.checked){
            div.remove();
        }
    });

    textMark.appendChild(img);
    
    localStorage.setItem("item" , input.value)
    localStorage.getItem("item")
}

