const form = document.querySelector('#form');
const list = document.querySelector('#list');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const formElement = event.target;
    const inputElement = formElement.text;
    const todoName = inputElement.value;
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo');
    newTodo.innerHTML = `
		<div>
			<span class="todo-name">${todoName}</span>
			<button class="delete-btn">Удалить<i class="icon-trash icon"></i></button>
			<button class="edit-btn">Редактировать<i class="icon-edit icon"></i></button>

		</div/>
	`;
    list.appendChild(newTodo);
    const task = Array.from(list.children).find((el) => el === newTodo);
    task.addEventListener('click', (e) => {
        const isDeleteButton = e.target.classList.toString() === 'delete-btn';
        const isEditButton = e.target.classList.toString() === 'edit-btn';
        if (isDeleteButton) onTaskDelete(task);
        if (isEditButton) onTaskEdit(task);
    });
    inputElement.value = '';

    function onTaskDelete(task) {
        task.remove();
    }
    function onTaskEdit(task) {
        const newTodoName = prompt('Введите новое название');
        const isValid = newTodoName.length > 3 && newTodoName.length < 20;
        if (isValid) {
            const span = task.querySelector('.todo-name');
            span.innerHTML = newTodoName;
        } else alert('Длина названия должна быть больше 3 и меньше 20');
    }
}
