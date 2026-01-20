# Manipulando o DOM com js

## Sumário

- [Entendendo o index.html](#entendendo-o-indexhtml)
  - [Estrutura Básica](#estrutura-básica)
  - [Cabeçalho (Head)](#cabeçalho-head)
  - [Corpo (Body)](#corpo-body)
  - [Conceitos Importantes](#conceitos-importantes)
- [Entendendo o tarefas.css](#entendendo-o-tarefascss)
  - [Reset e Configuração Base](#reset-e-configuração-base)
  - [Estilização do Body](#estilização-do-body)
  - [Container e Títulos](#container-e-títulos)
  - [Formulário](#formulário)
  - [Botões e Interatividade](#botões-e-interatividade)
  - [Itens de Tarefa](#itens-de-tarefa)
  - [Flexbox para Layout](#flexbox-para-layout)
  - [Responsividade](#responsividade)
  - [Conceitos CSS Importantes](#conceitos-css-importantes)
- [Entendendo o tarefas.js](#entendendo-o-tarefasjs)
  - [Array de Tarefas](#array-de-tarefas)
  - [addTask(event)](#addtaskevent)
  - [renderTasks()](#rendertasks)
  - [formatDate(dateString)](#formatdatedatestring)
  - [toggleComplete(taskId)](#togglecompletetaskid)
  - [deleteTask(taskId)](#deletetasktaskid)
  - [Event Listeners e Inicialização](#event-listeners-e-inicialização)
  - [Conceitos JavaScript Importantes](#conceitos-javascript-importantes)

## Entendendo o index.html

O arquivo `index.html` é a estrutura base da nossa aplicação de lista de tarefas. Vamos entender cada parte para iniciantes:

### Estrutura Básica

```html
<!DOCTYPE html>
<html lang="pt-BR">
```
- `<!DOCTYPE html>`: Declara que este é um documento HTML5
- `lang="pt-BR"`: Define o idioma da página como Português do Brasil

### Cabeçalho (Head)

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
    <link rel="stylesheet" href="tarefas.css">
</head>
```
- `charset="UTF-8"`: Define a codificação de caracteres (permite acentuação)
- `viewport`: Torna a página responsiva em dispositivos móveis
- `<title>`: Texto que aparece na aba do navegador
- `<link>`: Conecta o arquivo CSS para estilização

### Corpo (Body)

#### Container Principal
```html
<div class="container">
```
Uma `div` é um container genérico que agrupa elementos. A classe "container" é usada para aplicar estilos CSS.

#### Formulário de Adição
```html
<form id="addTaskForm">
    <div class="form-group">
        <label for="taskTitle">Título:</label>
        <input type="text" id="taskTitle" required>
    </div>
    ...
</form>
```
- `<form>`: Agrupa campos de entrada de dados
- `id="addTaskForm"`: Identificador único para manipulação JavaScript
- `<label>`: Rótulo descritivo para cada campo
- `<input>`: Campo de entrada de texto
- `required`: Torna o preenchimento obrigatório
- `<textarea>`: Campo de texto multilinha
- `type="date"`: Campo específico para datas

#### Área de Exibição das Tarefas
```html
<div id="tasksList"></div>
```
Esta div vazia será preenchida dinamicamente pelo JavaScript com as tarefas criadas.

#### Script JavaScript
```html
<script src="tarefas.js"></script>
```
Carrega o arquivo JavaScript que adiciona interatividade à página. Colocado no final para garantir que o HTML seja carregado primeiro.

### Conceitos Importantes

1. **IDs**: Identificadores únicos (`id="taskTitle"`) usados para selecionar elementos específicos no JavaScript
2. **Classes**: Identificadores reutilizáveis (`class="container"`) usados para aplicar estilos CSS
3. **Semântica**: Usar tags apropriadas (`<form>`, `<label>`, `<button>`) ajuda na acessibilidade e SEO
4. **Atributos**: Propriedades dos elementos (`type`, `required`, `rows`) que modificam seu comportamento

## Entendendo o tarefas.css

O arquivo `tarefas.css` é responsável pela aparência visual da aplicação. Vamos entender cada parte:

### Reset e Configuração Base

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```
- `*`: Seletor universal que aplica estilos a todos os elementos
- `margin` e `padding: 0`: Remove espaçamentos padrão do navegador
- `box-sizing: border-box`: Faz com que largura e altura incluam padding e border

### Estilização do Body

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}
```
- `font-family`: Define a fonte do texto (com fallbacks)
- `background: linear-gradient`: Cria um degradê roxo/azul
- `min-height: 100vh`: Garante altura mínima de 100% da viewport
- `padding`: Espaçamento interno de 20 pixels

### Container e Títulos

```css
.container {
    max-width: 800px;
    margin: 0 auto;
}
```
- `max-width`: Limita a largura máxima do conteúdo
- `margin: 0 auto`: Centraliza horizontalmente o container

```css
h1 {
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```
- `text-shadow`: Adiciona sombra ao texto (efeito visual)
- `rgba(0, 0, 0, 0.3)`: Cor preta com 30% de opacidade

### Formulário

```css
.task-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```
- `border-radius`: Arredonda os cantos do elemento
- `box-shadow`: Adiciona sombra para profundidade visual

```css
.form-group input:focus {
    outline: none;
    border-color: #667eea;
}
```
- `:focus`: Pseudo-classe aplicada quando o campo está selecionado
- `outline: none`: Remove a borda padrão do navegador

### Botões e Interatividade

```css
.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
```
- `:hover`: Pseudo-classe aplicada quando o mouse passa sobre o elemento
- `transform: translateY(-2px)`: Move o botão 2 pixels para cima
- `transition`: Suaviza a animação (definida na regra base)

### Itens de Tarefa

```css
.task-item.completed {
    background: #e8f5e9;
    border-color: #4caf50;
    opacity: 0.8;
}
```
- `.task-item.completed`: Seletor de classe múltipla (elemento com ambas as classes)
- `opacity`: Transparência (0.8 = 80% opaco)

```css
.task-item.completed .task-title {
    text-decoration: line-through;
    color: #999;
}
```
- `text-decoration: line-through`: Risca o texto (indicando conclusão)
- Seletor descendente: aplica apenas a `.task-title` dentro de `.task-item.completed`

### Flexbox para Layout

```css
#tasksList {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
```
- `display: flex`: Ativa o layout flexível
- `flex-direction: column`: Organiza itens verticalmente
- `gap`: Espaçamento entre itens filhos

### Responsividade

```css
@media (max-width: 600px) {
    h1 {
        font-size: 2rem;
    }
    .task-header {
        flex-direction: column;
    }
}
```
- `@media`: Media query para adaptar estilos em diferentes tamanhos de tela
- `max-width: 600px`: Aplica estilos quando a tela for menor que 600px
- Útil para tornar a aplicação mobile-friendly

### Conceitos CSS Importantes

1. **Seletores**: Como identificar elementos (`.class`, `#id`, `element`, `:hover`)
2. **Box Model**: Margem, borda, padding e conteúdo
3. **Cores**: Hexadecimal (`#667eea`), RGB, RGBA para transparência
4. **Transições**: Animações suaves entre estados (`transition`)
5. **Flexbox**: Sistema moderno de layout para organizar elementos
6. **Pseudo-classes**: Estados especiais (`:hover`, `:focus`)
7. **Media Queries**: Responsividade para diferentes dispositivos

## Entendendo o tarefas.js

O arquivo `tarefas.js` contém toda a lógica de interatividade da aplicação. Vamos entender cada função:

### Array de Tarefas

```javascript
let tasks = [];
```
Array que armazena todos os objetos de tarefa. Cada tarefa é um objeto com propriedades: `id`, `title`, `description`, `deadline`, `completed` e `deleted`.

### `addTask(event)`

**Propósito**: Adiciona uma nova tarefa ao array quando o formulário é enviado.

**Como funciona**:
1. `event.preventDefault()`: Impede o comportamento padrão do formulário (recarregar a página)
2. Captura os valores dos campos usando `document.getElementById()`
3. Cria um novo objeto tarefa com `id` único gerado por `Date.now()`
4. Adiciona a tarefa ao array com `tasks.push(task)`
5. Chama `renderTasks()` para atualizar a tela
6. Limpa o formulário com `.reset()`

**Conceitos-chave**: Manipulação de eventos, captura de valores de input, criação de objetos JavaScript.

### `renderTasks()`

**Propósito**: Atualiza a interface do usuário exibindo todas as tarefas ativas na tela.

**Como funciona**:
1. Busca o elemento `#tasksList` no DOM
2. Filtra tarefas não excluídas usando `tasks.filter()`
3. Se não houver tarefas, exibe mensagem de estado vazio
4. Para cada tarefa ativa, cria elementos DOM dinamicamente:
   - Usa `document.createElement()` para criar elementos
   - Define classes com `.className`
   - Preenche conteúdo com `.textContent` (previne XSS)
   - Configura eventos com `.onclick` e `.onchange`
5. Monta a estrutura hierárquica com `.appendChild()`

**Conceitos-chave**: Manipulação do DOM, criação dinâmica de elementos, segurança (prevenção XSS), array methods.

### `formatDate(dateString)`

**Propósito**: Converte data do formato ISO (YYYY-MM-DD) para formato brasileiro legível.

**Como funciona**:
1. Divide a string da data usando `.split('-')`
2. Cria um objeto `Date` com os valores separados
3. Usa `toLocaleDateString()` para formatar em português brasileiro
4. Retorna a data formatada (ex: "25 de janeiro de 2026")

**Conceitos-chave**: Manipulação de strings, objeto Date do JavaScript, internacionalização.

### `toggleComplete(taskId)`

**Propósito**: Alterna o estado de conclusão de uma tarefa (concluída/não concluída).

**Como funciona**:
1. Busca a tarefa no array usando `tasks.find()` pelo ID
2. Inverte o valor de `task.completed` usando operador `!` (NOT)
3. Chama `renderTasks()` para atualizar a visualização

**Conceitos-chave**: Array methods (find), operador lógico NOT, atualização de estado.

### `deleteTask(taskId)`

**Propósito**: Marca uma tarefa como excluída (soft delete).

**Como funciona**:
1. Encontra a tarefa pelo ID usando `tasks.find()`
2. Define `task.deleted = true` (não remove do array)
3. Chama `renderTasks()` para atualizar a tela

**Conceitos-chave**: Soft delete (marcação lógica), busca em arrays.

### Event Listeners e Inicialização

```javascript
document.getElementById('addTaskForm').addEventListener('submit', addTask);
renderTasks();
```

**Propósito**: Configura os eventos iniciais e renderiza tarefas existentes.

**Como funciona**:
1. Associa o evento `submit` do formulário à função `addTask`
2. Chama `renderTasks()` para exibir tarefas pré-existentes no array

**Conceitos-chave**: Event listeners, inicialização de aplicação.

### Conceitos JavaScript Importantes

1. **DOM Manipulation**: Seleção (`getElementById`) e criação (`createElement`) de elementos
2. **Event Handling**: Captura e resposta a ações do usuário
3. **Array Methods**: `push()`, `filter()`, `find()`, `forEach()`
4. **Arrow Functions**: Sintaxe moderna para funções (ex: `() => {}`)
5. **Template Literals**: Não usado aqui, mas `.textContent` previne XSS
6. **Segurança**: Uso de `textContent` ao invés de `innerHTML` para prevenir ataques XSS
7. **Estado da Aplicação**: Array `tasks` funciona como store de dados

