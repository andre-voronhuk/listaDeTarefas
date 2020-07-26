var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || []; //afazeres Padrao
renderTodos(); //primeira Render da pagina

function renderTodos() {
    listElement.innerHTML = '';
    for (var todo of todos) {

        var todoElement = document.createElement('li');
        inputElement.value = '';
        if (todo != '' && todo != ' ') {

            var todoText = document.createTextNode(todo);

            var linkElement = document.createElement('a');
            linkElement.setAttribute('href', '#')
            linkElement.style.textDecoration = 'none';
            var pos = todos.indexOf(todo);
            var linkText = document.createTextNode(' Delete');
            linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')
            linkElement.appendChild(linkText);
            todoElement.appendChild(todoText);
            todoElement.appendChild(linkElement);
            listElement.appendChild(todoElement);
        }


    }
} //renderiza os afazeres

buttonElement.addEventListener('click', function () {
    addTodo();
    inputElement.value = '';
}) //Adiciona novo item ao clicar no botao
inputElement.addEventListener('keydown', function (event) {
    if (event.keyCode == '13') {
        addTodo();
    }

}) //isso faz com que o ENTER adicione um novo item
function addTodo() {
    var todoText = inputElement.value;
    inputElement.Value = ""
    var filtro = todoText.split(' ');
    console.log(filtro[0]);
    if (todoText != '' && filtro[0] != '') {
        todos.push(todoText);
        saveStorage()

    }
    renderTodos();
} //adiciona uma tarefa a ser feita
function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveStorage()
} //Deleta o elemento com base na posicao dele no Array 'todos'

function saveStorage() {
    var pos = todos.indexOf('');

    console.log(pos);

    localStorage.setItem('list_todos', JSON.stringify(todos));

}