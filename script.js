jQuery(function($) {
    const todos = [];
    const list = $('.todos');
    const input = $('.todo-input');
    const todosItem = $('.todo-item');
    const btnChecked = $('.todos-checked-btn');
    
    function storageTodos() {
        let todosToString= localStorage.getItem("todos");
        if (todosToString !== null) {
            todos = JSON.parse(todosToString);
        }
        return todos;
    }
    
    function addTodo(value) {
        todos.push(value);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
    
    function renderTodos() {
        list.empty();
        $.each(todos, function(i) {
            list.prepend('<li class="todos-item" data-index="${i}">' + '<input class="todos-checked-button" name="todos-checked-button" type="checkbox">' + '<span id="todos-item-span">' + this + '</span>' + 
            ' <button class="todos-del-button" data-index="${i}">' + '<i class="fa fa-trash" aria-hidden="true">' + '</i>' + '</button>' + ' <button class="todos-edit-button" data-index="${i}">' + '<i class="fa fa-pencil" aria-hidden="true">' + '</i>' + '</button>' + '</li>');
        });
    }
    
    function removeTodo(index) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
    
    
    input.on('change', function(e) {
        addTodo(this.value);
        this.value = '';
    });
    
    $(document).on('click', '.todos-del-button', function() {
        const index = $(this).data('index');
        removeTodo(index, 1);
    });
    
    $(document).on('click', '.todos-edit-button', function () {
        $(this).closest('li').find('span').prop('contenteditable', true).focus();
        return false;
        renderTodos();
    });
    
 
    
});

