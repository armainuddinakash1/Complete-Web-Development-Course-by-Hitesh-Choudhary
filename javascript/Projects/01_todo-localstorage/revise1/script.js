const todoInput = document.getElementById('todo-input')
const addTaskBtn = document.getElementById('add-task-btn')
const todoList = document.getElementById('todo-list')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
document.addEventListener("DOMContentLoaded", ()=>{
    tasks.forEach(task => renderFunc(task));
})

function addTaskFunc(){
    const newTask = {}
    newTask.text = todoInput.value.trim()
    newTask.id = Date.now()
    newTask.completed = false
    tasks.push(newTask)
    saveTasks()
    renderFunc(newTask)
    todoInput.value = ""

    
}
addTaskBtn.addEventListener('click', addTaskFunc)
todoInput.addEventListener('keydown',(e)=>{
    if(e.key === "Enter") addTaskFunc()
})
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function renderFunc(task){
    // check whether completed is true or not
    const li = document.createElement('li')
    li.setAttribute('data-id', task.id)
    if(task .completed) li.classList.add('completed')
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `
    li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON') return
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
    

    })
    li.addEventListener('click', (e)=>{
        if(e.target.tagName === 'BUTTON'){
            tasks = tasks.filter(element => element.id !== task.id)
            saveTasks()
            li.remove()
        }
    })
    todoList.appendChild(li)
}
