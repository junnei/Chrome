const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
  restoreList = document.querySelector(".js-restoreList");

const TODOS_LS = "toDos";
const TODOS_ID = "id"
const RE_TODOS = "restoreToDos";

let toDosID = 0;
let toDos = [];
let restoreToDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const parent = btn.parentNode;
  toDoList.removeChild(parent);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(parent.id);
  });
  const addToDos = toDos.find(function(toDo){
    return toDo.id === parseInt(parent.id);
  });

  const li = document.createElement("li");
  const restoreBtn = document.createElement("button");
  const span = document.createElement("span");
  restoreBtn.innerText = "⟲";
  restoreBtn.addEventListener("click", restoreToDo);
  span.innerText = addToDos.text;
  li.appendChild(restoreBtn);
  li.appendChild(span);
  li.id = addToDos.id;
  restoreList.appendChild(li);
  
  toDos = cleanToDos;
  saveToDos();
  restoreToDos = restoreToDos.concat(addToDos);
  saveRestore();
}

function restoreToDo(event){
  const btn = event.target;
  const parent = btn.parentNode;
  restoreList.removeChild(parent);

  const cleanToDos = restoreToDos.filter(function(toDo) {
    return toDo.id !== parseInt(parent.id);
  });
  const addToDo = restoreToDos.find(function(toDo) {
    return toDo.id === parseInt(parent.id);
  });
  
  restoreToDos = cleanToDos;

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = addToDo.text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = addToDo.id;
  toDoList.appendChild(li);

  toDos = toDos.concat(addToDo);
  saveToDos();
  saveRestore();
}

function paintRestore(obj){
  const li = document.createElement("li");
  const restoreBtn = document.createElement("button");
  const span = document.createElement("span");
  restoreBtn.innerText = "⟲";
  restoreBtn.addEventListener("click", restoreToDo);
  span.innerText = obj.text;
  li.appendChild(restoreBtn);
  li.appendChild(span);
  li.id = obj.id;
  restoreList.appendChild(li);
  const restoreObj = {
    text: obj.text,
    id: obj.id
  };
  restoreToDos.push(restoreObj);
  saveRestore();
}

function paintToDo(obj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = obj.text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = obj.id;
  toDoList.appendChild(li);
  const toDoObj = {
    text: obj.text,
    id: obj.id
  };
  toDos.push(toDoObj);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(TODOS_ID, toDosID);
}

function saveRestore() {
  localStorage.setItem(RE_TODOS, JSON.stringify(restoreToDos));
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const newID = toDosID+1;
  const toDoObj = {
    text: currentValue,
    id: newID
  };
  toDosID = newID;
  paintToDo(toDoObj);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(localStorage.getItem(TODOS_ID) !== null ) {
    toDosID = parseInt(localStorage.getItem(TODOS_ID));
  }
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo);
    });
  }
}
function loadRestore() {
  const loadedRestore = localStorage.getItem(RE_TODOS);
  if (loadedRestore !== null) {
    const parsedToDos = JSON.parse(loadedRestore);
    parsedToDos.forEach(function(toDo) {
      paintRestore(toDo);
    });
  }
}
function init() {
  loadToDos();
  loadRestore();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();