function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}

function get_completed_todos() {
    var completed_todos = new Array;
    var todos_str = localStorage.getItem('completed_todo');
    if (todos_str !== null) {
        completed_todos = JSON.parse(todos_str); 
    }
    return completed_todos;
}
 
function add() {
    var task = document.getElementById('task').value;
 
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));

    document.getElementById("task").value = "";
 
    show();

    console.log("Item added: " + task);
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    var removed_item = todos[id];
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();

    document.getElementById('task').focus();

    console.log("Item removed: " + removed_item);
 
    return false;
}

function complete() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    var completed = todos[id];
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    
 
    var completed_todos = get_completed_todos();
    completed_todos.push(completed);
    localStorage.setItem('completed_todo', JSON.stringify(completed_todos));
 
    show();

    document.getElementById('task').focus();

    console.log("Item marked as completed: " + completed);
 
    return false;
}
 
function show() {
    var todos = get_todos();
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li> <button class="complete" id="' + i  + '"><i class="pe-7s-check"></i></button> <button class="remove" id="' + i  + '"><i class="pe-7s-close"></i></button> ' + todos[i] + '</li>';
    };
    html += '</ul>';
    document.getElementById('todos').innerHTML = html;


    var completed_todos = get_completed_todos()
    var html2 = '<ul>';
    for(var i=0; i<completed_todos.length; i++) {
        html2 += '<li> <button class="remove_completed" id="' + i  + '"><i class="fa fa-times" aria-hidden="true"></i></button> ' + completed_todos[i] + '</li>';
    };
    html2 += '</ul>';
    document.getElementById('done').innerHTML = html2;
 
    // COMBINE BELOW 2 FUNCTIONS AND PASS IN REMOVE/COMPLETE
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
    var buttons = document.getElementsByClassName('complete');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', complete);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();