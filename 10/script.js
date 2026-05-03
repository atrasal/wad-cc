function loadTasks(){
    fetch('/tasks')
    .then(response => response.json())
    .then(data =>{
        let list = document.getElementById('list');
        list.innerHTML = '';
        data.forEach((task,index) =>{
            list.innerHTML += `
                <li>
                    ${task.name}
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="editTask(${index})">Edit</button>
                </li>
            `;
        });
    });
}

function addTask(){
    let task = document.getElementById('taskInput').value;
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name: task})
    }).then(() =>{
        loadTasks();
    })
}
function deleteTask(index){
    fetch('/tasks/'+index, {
        method: 'DELETE'
    }).then(() =>{
        loadTasks();
    })
}
function editTask(index){
    let newTask = prompt('Enter new task:');
    fetch('/tasks/'+index, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name: newTask})
    }).then(() =>{
        loadTasks();
    })
}
loadTasks();