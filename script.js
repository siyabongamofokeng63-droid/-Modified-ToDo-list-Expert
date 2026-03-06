let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask();
}
});


function addTask(){

if(taskInput.value.trim()==="") return;

const task = {
text:taskInput.value,
priority:priority.value,
date:dueDate.value,
completed:false
};

tasks.push(task);

saveTasks();

taskInput.value="";

renderTasks();
}


function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

li.className=`task priority-${task.priority} ${task.completed ? "completed":""}`;

li.innerHTML=`

<div>

<strong>${task.text}</strong><br>
<small>Due: ${task.date || "No date"}</small>

</div>

<div>

<button onclick="toggleTask(${index})">✔</button>
<button onclick="deleteTask(${index})">🗑</button>

</div>

`;

taskList.appendChild(li);

});

updateDashboard();

}


function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();

renderTasks();

}


function deleteTask(index){

tasks.splice(index,1);

saveTasks();

renderTasks();

}


function updateDashboard(){

totalTasks.textContent=tasks.length;

const completed=tasks.filter(t=>t.completed).length;

completedTasks.textContent=completed;

pendingTasks.textContent=tasks.length-completed;

}


function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}


renderTasks();