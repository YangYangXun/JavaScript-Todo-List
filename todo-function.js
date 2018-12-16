'use strict'

const getSavedNotes = function () {


    var todosJson = localStorage.getItem('todos')
    return todosJson ? JSON.parse(todosJson) : []

    // if (todosJson !== null) {
    //     return JSON.parse(todosJson)
    // } else {
    //     return []
    // }

}

const moveToFinishPanel = function (todo_id) {
    const todoFindIndex = todos.findIndex(function (todo) {
        return todo.id == todo_id
    })

    if (todos[todoFindIndex].completed) {
        todos[todoFindIndex].completed = false
        savaNotes(todos)
        renderTodos(todos, filters)
    } else {

        if (todoFindIndex > -1) {
            console.log(todoFindIndex)
            console.log(todos[todoFindIndex])
            todos[todoFindIndex].completed = true
            savaNotes(todos)
            renderTodos(todos, filters)
        }
    }



}

const createBreadCrumb = function (todo) {
    // Create Layout
    const todoBreadCrumb = document.createElement('ol')
    todoBreadCrumb.className = "breadcrumb"
    // Create Item inside layout
    // 1.Checkbox
    const check = document.createElement('input')
    check.type = "checkbox"
    check.id = todo.id
    check.checked = todo.completed
    check.className = "completed_check"
    check.addEventListener('change', function () {
        console.log(todo.text + ' be click!')
        moveToFinishPanel(todo.id)
    })
    // 2.Item text
    const newTodoItem = document.createElement('li')
    newTodoItem.className = "breadcrumb-item"
    newTodoItem.textContent = todo.text
    // Append
    todoBreadCrumb.appendChild(check)
    todoBreadCrumb.appendChild(newTodoItem)

    return todoBreadCrumb
}

// 根據既有陣列 建立Todos 畫面 
const printTodoItemToPanel = function (todos) {

    todos.forEach(function (todo) {
        var newTodoBreadCrumb = createBreadCrumb(todo)
        if (todo.completed) {
            // Add to finish panel
            document.querySelector('#todo-finish-panel').appendChild(newTodoBreadCrumb)
        } else {
            // Add to panel
            document.querySelector('#todo-panel').appendChild(newTodoBreadCrumb)
        }
    })

}

// clean panel
const cleanPanel = function () {
    document.querySelector('#todo-panel').innerHTML = ""
    document.querySelector('#todo-finish-panel').innerHTML = ""

}

const showTodoCount = function (todos) {
    var finishItemNum = 0;
    todos.forEach(function (todo) {
        if (todo.completed) {
            finishItemNum++
        }
    })

    const todoFinishNum = document.querySelector('#span-finish-item-num')
    const todoNotFinishNum = document.querySelector('#span-nonfinish-item-num')

    todoFinishNum.textContent = finishItemNum
    todoNotFinishNum.textContent = todos.length - finishItemNum
}


const renderTodos = function (todos, filters) {
    let filterTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    cleanPanel()
    printTodoItemToPanel(filterTodos)
    showTodoCount(filterTodos)
}


const savaNotes = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}


