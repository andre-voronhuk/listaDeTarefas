var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var completeElement = document.querySelector('check-complete');

var todos = JSON.parse(localStorage.getItem('list_todos')) || []; //afazeres Padrao
var completedTodos = localStorage.getItem('completed') || [];
renderTodos(); //primeira Render da pagina
function renderTodos() {
    listElement.innerHTML = '';
    pos = 0
    for (var todo of todos) {
        var todoElement = document.createElement('li');
        inputElement.value = '';
        if (todo != '' && todo != ' ') {
            todoElement.id = "todo " + pos
            var linkElement = document.createElement('a');
            linkElement.setAttribute('href', '#');
            var completeElement = document.createElement('input');
            completeElement.type = "checkbox"
            completeElement.className = "check-complete"
            var linkText = document.createTextNode('X ');
            var okElement = document.createElement('a');
            okElement.setAttribute('href', '#')
            okElement.setAttribute('id', 'todos')
            var okTextNode = document.createTextNode(pos + 1 + ' - ' + todo + " ");
            okElement.appendChild(okTextNode);
            linkElement.style.textDecoration = 'none';
            completeElement.setAttribute("id", pos)
            completeElement.setAttribute('onclick', 'complete(' + pos + ')')
            if (completedTodos.indexOf(`[${pos}]`) >= 0) {
                completeElement.setAttribute("checked", true)
                okElement.className = "CheckedTodo"
            } else {
                completeElement.removeAttribute("checked", true)
            }
            linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')
            linkElement.appendChild(linkText);
            todoElement.appendChild(linkElement);
            todoElement.appendChild(okElement);
            todoElement.appendChild(completeElement);
            listElement.appendChild(todoElement);
            pos = pos + 1
        }
    }
} //renderiza os afazeres

function complete(pos) {
    if (completedTodos.indexOf(`[${pos}]`) >= 0) {
        completedTodos = completedTodos.replace(`[${pos}]`, '')
        completedTodos = completedTodos.replace("[]", "")
        localStorage.setItem('completed', completedTodos)
    } else {
        completedTodos = completedTodos + `[${pos}]`

        localStorage.setItem('completed', completedTodos)
    }
    renderTodos();
}

buttonElement.addEventListener('click', function() {
        addTodo();
        inputElement.value = '';
    }) //Adiciona novo item ao clicar no botao
inputElement.addEventListener('keydown', function(event) {
        if (event.keyCode == '13') {
            addTodo();
        }
    }) //isso faz com que o ENTER adicione um novo item

function addTodo() {
    var todoText = inputElement.value;
    inputElement.Value = ""
    var filtro = todoText.split(' ');
    if (todoText != '' && filtro[0] != '') {
        todos.push(todoText);
        saveStorage()
    }
    renderTodos();
    document.getElementById('input').select();

} //adiciona uma tarefa a ser feita
function deleteTodo(pos) {
    todos.splice(pos, 1);
    if (completedTodos.indexOf(`[${pos}]`) >= 0) {
        completedTodos = completedTodos.replace(`[${pos}]`, "")
        completedTodos = completedTodos.replace("[]", "")
    };
    localStorage.setItem('completed', completedTodos)

    for (let index = 0; index <= completedTodos.length; index++) {
        numero = completedTodos[index]

        if (numero > pos) {
            completedTodos = completedTodos.replace(`[${numero}]`, `[${numero-1}]`)
        }
    }

    localStorage.setItem('completed', completedTodos)

    renderTodos();
    saveStorage()
} //Deleta o elemento com base na posicao dele no Array 'todos'

function saveStorage() {
    var pos = todos.indexOf('');
    localStorage.setItem('list_todos', JSON.stringify(todos));
}