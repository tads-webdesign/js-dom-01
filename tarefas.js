// Array para armazenar as tarefas
let tasks = [
    {
        id: 1,
        title: 'Estudar JavaScript',
        description: 'Revisar conceitos de manipulação do DOM e eventos',
        deadline: '2026-01-25',
        completed: false,
        deleted: false
    },
    {
        id: 2,
        title: 'Fazer exercícios',
        description: 'Completar os exercícios práticos do curso',
        deadline: '2026-01-30',
        completed: false,
        deleted: false
    }
];

// Função para adicionar uma nova tarefa
function addTask(event) {
    event.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;
    
    const task = {
        id: Date.now(),
        title: title,
        description: description,
        deadline: deadline,
        completed: false,
        deleted: false
    };
    
    tasks.push(task);
    renderTasks();
    
    // Limpar o formulário
    document.getElementById('addTaskForm').reset();
}

// Função para renderizar as tarefas na tela
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    
    // Filtrar tarefas não excluídas
    const activeTasks = tasks.filter(task => !task.deleted);
    
    if (activeTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">Nenhuma tarefa adicionada ainda. Comece criando uma nova tarefa!</div>';
        return;
    }
    
    tasksList.innerHTML = '';
    
    activeTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Create elements safely to prevent XSS
        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';
        
        const taskTitle = document.createElement('h3');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        taskHeader.appendChild(taskTitle);
        
        const taskDescription = document.createElement('p');
        taskDescription.className = 'task-description';
        taskDescription.textContent = task.description;
        
        const taskDeadline = document.createElement('div');
        taskDeadline.className = 'task-deadline';
        taskDeadline.textContent = `📅 Deadline: ${formatDate(task.deadline)}`;
        
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${task.id}`;
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleComplete(task.id);
        
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', `task-${task.id}`);
        checkboxLabel.textContent = 'Concluída';
        
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.textContent = '🗑️ Excluir';
        deleteButton.onclick = () => deleteTask(task.id);
        
        taskItem.appendChild(taskHeader);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDeadline);
        taskItem.appendChild(checkboxContainer);
        taskItem.appendChild(deleteButton);
        
        tasksList.appendChild(taskItem);
    });
}

// Função para formatar a data
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// Função para marcar/desmarcar tarefa como concluída
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Função para excluir uma tarefa
function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.deleted = true;
        renderTasks();
    }
}

// Event listener para o formulário
document.getElementById('addTaskForm').addEventListener('submit', addTask);

// Renderizar tarefas inicialmente
renderTasks();
