const ls = window.localStorage;
const active = ls.getItem('active');
if(active===null){
    window.location.href = 'index.html';
}
else{
    const sLogout = document.querySelector('#logout');
    const sTime = document.querySelector('#time');
    const addBtn = document.querySelector('#add_task');
    const taskPanel = document.querySelector('.task-panel');
    const taskBody = document.querySelector('#task-body');
    const newTask = document.querySelector('#task');
    const li = document.createElement('li');
    const markBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    // Real Time...
    const GetTime = ()=>(sTime.innerHTML = new Date().toLocaleTimeString())
    setInterval(GetTime,1000);

    let tasks, todos, key;
    if(ls.getItem('tasks')===null){
        // console.log('Task Empty...');
        tasks = [];
    }
    else{
        tasks = JSON.parse(ls.getItem('tasks'));
        tasks.forEach((task, i) => {
            if(task.user == active) {
                key = i;
                todos = task.task;
                if(todos){
                    taskBody.innerHTML = '' ;
                    todos.forEach((todo, i)=>{
                        if(todo.marked){
                            taskBody.innerHTML += `<li style="text-decoration: line-through;">${todo.name}</li>`;
                        } else {
                            taskBody.innerHTML += `<li>${todo.name}</li>`;
                        }
                    });
                }else{
                    todos = [];
                }
            }
        });
    }
    
    document.addEventListener('click',(e)=>{
        if(e.target.matches('li')){
            todos.forEach((elem,i)=>{
                if(elem.name == e.target.innerHTML){
                    newTask.value = e.target.innerHTML;
                    addBtn.value = 'Update';
                    addBtn.setAttribute('key',i);
                    markBtn.innerHTML = 'Mark/Unmark';
                    markBtn.setAttribute('key',i);
                    removeBtn.innerHTML = 'Remove';
                    removeBtn.setAttribute('key',i);
                    taskPanel.append(markBtn);
                    taskPanel.append(removeBtn);
                }
            });
        }
        if(e.target.matches('button')){
            if(e.target.innerHTML == 'Mark/Unmark'){
            let mark;
            mark = tasks[key].task[markBtn.getAttribute('key')].marked;
            if(mark){
                tasks[key].task[markBtn.getAttribute('key')].marked = false;
            } else {
                tasks[key].task[markBtn.getAttribute('key')].marked = true;
            }
                ls.setItem('tasks',JSON.stringify(tasks));
                window.location.reload();    
            }
            if(e.target.innerHTML == 'Remove') {
                tasks[key].task.splice(removeBtn.getAttribute('key'),1);
                ls.setItem('tasks',JSON.stringify(tasks));
                window.location.reload();    
            }
        }
    });

    addBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(addBtn.value == 'Update'){
            if(!newTask.value || newTask.value == ''){
                alert('Please Enter Task...');
            }
            else{
                tasks[key].task[addBtn.getAttribute('key')].name = newTask.value;
                ls.setItem('tasks',JSON.stringify(tasks));
                window.location.reload();
            }
        }
        if(addBtn.value == 'Add Task'){
            if(!newTask.value || newTask.value == ''){
                alert('Please Enter Task...');
            }
            else{
                li.innerHTML = newTask.value;
                let newTodo;
                if(tasks!=''){
                    if(tasks[key]==undefined){
                        newTodo = {
                            'user': active,
                            'task': [{
                                'name': newTask.value,
                                'marked': false    
                            }]
                        }
                        tasks.push(newTodo);
                        ls.setItem('tasks',JSON.stringify(tasks));
                        window.location.reload();               
                    }
                    else{
                        newTodo = {
                            'name': newTask.value,
                            'marked': false
                        }
                        console.log('task - ',tasks[key]);
                        tasks[key].task.push(newTodo);
                        ls.setItem('tasks',JSON.stringify(tasks));
                        window.location.reload();
                    }
                }
                else{
                    newTodo = {
                        'user': active,
                        'task': [{
                            'name': newTask.value,
                            'marked': false    
                        }]
                    }
                    tasks.push(newTodo);
                    ls.setItem('tasks',JSON.stringify(tasks));
                    window.location.reload();
                }
                newTask.value = '';
            }
        }
    });


    sLogout.addEventListener('click',(e)=>{
        // console.log('Logout user - ', active);
        ls.removeItem('active');
        window.location.href = 'index.html';
    });
}