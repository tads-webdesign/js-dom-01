// Array para armazenar as tarefas
let tasks = [];

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
        completed: false
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
        
        taskItem.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
            </div>
            <p class="task-description">${task.description}</p>
            <div class="task-deadline">📅 Deadline: ${formatDate(task.deadline)}</div>
            <div class="checkbox-container">
                <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
                <label for="task-${task.id}">Concluída</label>
            </div>
            <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
        `;
        
        tasksList.appendChild(taskItem);
    });
}

// Função para formatar a data
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
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
