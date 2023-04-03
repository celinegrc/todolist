//Selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo')

//Ecouteurs
window.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Fonctions

function addTodo(event){
    event.preventDefault()
    if (todoInput.value !== ""){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Créer le li
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todoInput.value;
        // Ajouter la todo au localStorage
        saveLocalTodos(todoInput.value)
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Ajouter à todoList
        todoList.appendChild(todoDiv)
        todoInput.value="";
        //Bouton Check
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton)
        //Bouton supprimer
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton)  
    }
}

function deleteCheck(e){
    e.stopPropagation()
    const item = e.target
    if (item.classList[0] ==="complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed")  
    }
    else if (item.classList.value === "trash-btn"){
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", ()=>{
        todo.remove()
        })
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos)
    for (let todo of todoList.childNodes){
        if (todo.classList !==undefined){
            switch (e.target.value) {
            case "all": 
                { if (todo.classList !== "undefined")
                     todo.style.display = "flex";
                }
                break;
            case "completed":
                if ( (todo.classList.contains("completed"))){
                        todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                    }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            }
        }
    }
     
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [] 
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}



function getTodos(){ 
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [] 
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todos)
    todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Ajouter à todoList
    todoList.appendChild(todoDiv)
    //Bouton Check
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton)
    //Bouton supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton)
    })
}
console.log(localStorage)


function removeLocalTodos(todo){

    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [] 
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText
    console.log(todos.indexOf(todo.children[0].innerText))
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}