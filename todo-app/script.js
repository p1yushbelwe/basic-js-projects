document.addEventListener('DOMContentLoaded', function () {
    let taskInput = document.getElementById('task-input')
    let taskAdd = document.getElementById('add-task')
    let taskDisplay = document.getElementById('all-tasks')

    let taskContainer = JSON.parse(localStorage.getItem('task')) || [];

    taskContainer.forEach(tasks => {
        renderTask(tasks)
    });

    // Task Rendered
    function renderTask(task) {
        let li = document.createElement('li');
        li.setAttribute("data-id", task.id)
        li.classList = "flex justify-between text-white/85 bg-neutral-800 px-2 py-1 mr-1 select-none  list-none my-2 rounded-sm hover:bg-neutral-700"
        li.innerHTML = `
                <span>${task.text}</span>
                <button id="delete-task" class="text-[15px] bg-rose-600/90 shadow-md cursor-pointer px-1 rounded-xs">Delete</button>
        `
        
        if(task.completed){
            li.classList.toggle('line-through')
            li.classList.toggle('decoration-white/80')
        }

        li.addEventListener('click', function(e){
            if(e.target.tagName === "BUTTON"){
                return 
                
            }
            task.completed = !task.completed
            saveLocal()
            this.classList.toggle('line-through')
            this.classList.toggle('decoration-white/80')
        })


        li.querySelector('#delete-task').addEventListener('click', function(e){
            e.stopPropagation();
            taskContainer = taskContainer.filter((t) => t.id !== task.id);
            li.remove()
            saveLocal()
        })


        taskDisplay.appendChild(li)
    }



    // Add task over click
    taskAdd.addEventListener('click', function () {
        if (taskInput.value === "") {
            return
        }
        let newTask = {
            id: Date.now(),
            text: taskInput.value,
            completed: false
        }

        taskContainer.push(newTask);
        renderTask(newTask)
        saveLocal();

        taskInput.value = ""

    })

    taskInput.addEventListener('keydown', function (e) {
        if (e.code !== "Enter") {
            return
        }
        if (taskInput.value === "") {
            return
        }
        let newTask = {
            id: Date.now(),
            text: taskInput.value,
            completed: false
        }

        taskContainer.push(newTask)
        renderTask(newTask)

        saveLocal()

        taskInput.value = ""
    })

    function saveLocal() {
        localStorage.setItem("task", JSON.stringify(taskContainer));
    }
})